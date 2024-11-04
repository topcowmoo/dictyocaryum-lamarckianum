const { User, Locker } = require('../models');
const { hashPassword, verifyPassword, generateToken } = require('../auth');
const Joi = require('joi');

// Joi schema for user validation
const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
    .required()
    .messages({
      'string.pattern.base': `Password must be at least 14 characters long, include uppercase and lowercase letters, a number, and a special character.`,
    }),
});

// Register User
exports.registerUser = async (req, res) => {
  console.log('Request Body:', req.body); // Logging for debugging
  const { email, password } = req.body;

  // Validate the input data
  const { error } = userSchema.validate({ email, password });
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    // Hash the password and create the user
    const { salt, hash } = hashPassword(password);
    const newUser = new User({ email, passwordHash: hash, salt });
    await newUser.save();

    // Generate a JWT token
    const token = generateToken(newUser);

    // Send a JSON response with a success message and token
    res.status(201).json({
      message: 'User registered successfully',
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !verifyPassword(password, user.passwordHash, user.salt)) {
      return res.status(400).send('Invalid email or password');
    }

    user.lastLogin = new Date(); // Update last login
    await user.save();

    const token = generateToken(user); // Generate JWT

    res.cookie('token', token, {
      httpOnly: true,  // Prevents access to cookie from JS
      secure: true,    // Ensures cookie is sent over HTTPS
      sameSite: 'strict', // Mitigates CSRF attacks
      maxAge: 24 * 60 * 60 * 1000, // 1-day expiration
    });


    res.status(200).json({ message: 'Login successful!', token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error logging in');
  }
};

// Get All Users
exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select('-passwordHash -__v').sort({ _id: -1 });
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(400).send('Error fetching users');
  }
};

// Get User by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-passwordHash -__v');
    if (!user) {
      return res.status(404).json({ message: 'No user found with this ID!' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).send('Error fetching user');
  }
};

// Update User by ID
exports.updateUser = async (req, res) => {
  const { password, ...rest } = req.body;

  try {
    if (password) {
      const { salt, hash } = hashPassword(password);
      rest.passwordHash = hash;
      rest.salt = salt;
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, rest, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'No user found with this ID!' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(400).send('Error updating user');
  }
};

// Reset Master Password
exports.resetPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { salt, hash } = hashPassword(password);
    user.passwordHash = hash;
    user.salt = salt;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('Error resetting password:', err);
    res.status(500).json({ message: 'Error resetting password. Please try again later.' });
  }
};

// Delete User by ID and related lockers
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'No user found with this ID!' });
    }

    await Locker.deleteMany({ userId: deletedUser._id });
    res.status(200).json({ message: 'User and associated data deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).send('Error deleting user');
  }
};

// Get Current User from Token
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-passwordHash -__v');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).send('Error fetching current user');
  }
};
