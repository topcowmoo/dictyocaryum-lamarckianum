const { User, Locker } = require('../models');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const crypto = require('crypto');

// Joi schema for user validation
const userSchema = Joi.object({
  email: Joi.string().min(3).required(),
  password: Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
    .required()
    .messages({
      'string.pattern.base': `Password must be at least 9 characters long, include uppercase and lowercase letters, a number, and a special character.`,
    }),
});

// Helper function to hash password using PBKDF2
const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('hex'); // Generate a salt
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
  return { salt, hash };
};

// Helper function to verify password using PBKDF2
const verifyPassword = (password, hash, salt) => {
  const newHash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
  return hash === newHash; // Compare the hash
};

// Register User
exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate the input
  const { error } = userSchema.validate({ username, password });
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    // Hash the password using PBKDF2
    const { salt, hash } = hashPassword(password);

    // Save the new user with the hashed password and salt to the database
    const newUser = new User({ email, passwordHash: hash, salt: salt });
    await newUser.save();

    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering user');
  }
};

// Login User with JWT and update last login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send('Invalid username or password');
    }

    // Compare the password with the stored hashed password using PBKDF2
    const isPasswordValid = verifyPassword(password, user.passwordHash, user.salt);
    if (!isPasswordValid) {
      return res.status(400).send('Invalid username or password');
    }

    // Update lastLogin field
    user.lastLogin = new Date();
    await user.save();

    // Create JWT Token
    const token = jwt.sign(
      { userId: user._id, username: user.username }, // Payload
      process.env.JWT_SECRET, // Use an environment variable for the secret key
      { expiresIn: '1h' } // Token expiration time
    );

    res.status(200).json({ message: 'Login successful!', token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error logging in');
  }
};

const userController = {
  // Get all users (async/await implementation)
  getAllUser: async (req, res) => {
    try {
      const users = await User.find({}).select('-passwordHash -__v').sort({ _id: -1 });
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(400).send('Error fetching users');
    }
  },

  // Get a single user by ID (async/await implementation)
  getUserById: async ({ params }, res) => {
    try {
      const user = await User.findOne({ _id: params.id }).select('-passwordHash -__v');
      if (!user) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(400).send('Error fetching user');
    }
  },

  // Create a user (async/await implementation)
  createUser: async ({ body }, res) => {
    try {
      const newUser = await User.create(body);
      res.status(201).json(newUser);
    } catch (err) {
      console.error(err);
      res.status(400).send('Error creating user');
    }
  },

  // Update user by ID (async/await implementation)
  updateUser: async ({ params, body }, res) => {
    try {
      // If password is being updated, hash it before saving
      if (body.password) {
        const { salt, hash } = hashPassword(body.password);
        body.passwordHash = hash;
        body.salt = salt;
        delete body.password;
      }

      const updatedUser = await User.findOneAndUpdate({ _id: params.id }, body, {
        new: true,
        runValidators: true,
      });
      if (!updatedUser) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }
      res.status(200).json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(400).send('Error updating user');
    }
  },

  // Delete user and related lockers (async/await implementation)
  deleteUser: async ({ params }, res) => {
    try {
      const deletedUser = await User.findOneAndDelete({ _id: params.id });
      if (!deletedUser) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      // Optionally delete associated lockers
      await Locker.deleteMany({ userId: deletedUser._id });
      res.status(200).json({ message: 'User and associated passwords deleted!' });
    } catch (err) {
      console.error(err);
      res.status(400).send('Error deleting user');
    }
  },
};

module.exports = userController;
