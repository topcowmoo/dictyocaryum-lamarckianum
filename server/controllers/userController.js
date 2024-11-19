const { User, Locker } = require('../models'); // Import User and Locker models
const { hashPassword, verifyPassword, generateToken } = require('../auth'); // Import authentication utility functions
const Joi = require('joi'); // Import Joi for input validation

// Joi schema for user validation
const userSchema = Joi.object({
  email: Joi.string().email().required(), // Validate email as a required string in email format
  password: Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')) // Password pattern
    .required()
    .messages({
      'string.pattern.base': `Password must be at least 14 characters long, include uppercase and lowercase letters, a number, and a special character.`, // Custom error message for password validation
    }),
});

// Register User
exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate the input data using the Joi schema
  const { error } = userSchema.validate({ email, password });
  if (error) return res.status(400).json({ message: error.details[0].message }); // Return validation error

  try {
    // Hash the password and create a new user
    const { salt, hash } = hashPassword(password);
    const newUser = new User({ email, passwordHash: hash, salt });
    await newUser.save(); // Save the user to the database

    // Generate a JWT token for the user
    const token = generateToken(newUser);

    // Respond with a success message and the generated token
    res.status(201).json({
      message: 'User registered successfully',
      token,
    });
  } catch (err) {
    console.error(err); // Log any errors for debugging
    res.status(500).json({ message: 'Error registering user' }); // Respond with a generic error message
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email and verify the password
    const user = await User.findOne({ email });
    if (!user || !verifyPassword(password, user.passwordHash, user.salt)) {
      return res.status(400).send('Invalid email or password'); // Return error if authentication fails
    }

    user.lastLogin = new Date(); // Update the user's last login date
    await user.save(); // Save the updated user data

    const token = generateToken(user); // Generate a JWT token

    // Set the token as a secure, HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,  // Prevents access to cookie from client-side JavaScript
      secure: true,    // Ensures cookie is sent over HTTPS
      sameSite: 'strict', // Restricts cookie to same-site requests to mitigate CSRF attacks
      maxAge: 24 * 60 * 60 * 1000, // Set cookie expiration to 1 day
    });

    res.status(200).json({ message: 'Login successful!', token }); // Respond with success message and token
  } catch (err) {
    console.error(err); // Log any errors for debugging
    res.status(500).send('Error logging in'); // Respond with a generic error message
  }
};

// Get All Users
exports.getAllUser = async (req, res) => {
  try {
    // Retrieve all users, excluding the passwordHash and __v fields, and sort by newest first
    const users = await User.find({}).select('-passwordHash -__v').sort({ _id: -1 });
    res.status(200).json(users); // Respond with the list of users
  } catch (err) {
    console.error(err); // Log any errors for debugging
    res.status(400).send('Error fetching users'); // Respond with a generic error message
  }
};

// Get User by ID
exports.getUserById = async (req, res) => {
  try {
    // Retrieve a user by their ID, excluding the passwordHash and __v fields
    const user = await User.findById(req.params.id).select('-passwordHash -__v');
    if (!user) {
      return res.status(404).json({ message: 'No user found with this ID!' }); // Respond if user not found
    }
    res.status(200).json(user); // Respond with the user data
  } catch (err) {
    console.error(err); // Log any errors for debugging
    res.status(400).send('Error fetching user'); // Respond with a generic error message
  }
};

// Update User by ID
exports.updateUser = async (req, res) => {
  const { password, ...rest } = req.body; // Extract password and other data from the request body

  try {
    // If password is provided, hash it and add to the update object
    if (password) {
      const { salt, hash } = hashPassword(password);
      rest.passwordHash = hash;
      rest.salt = salt;
    }

    // Update the user by ID with the new data
    const updatedUser = await User.findByIdAndUpdate(req.params.id, rest, {
      new: true, // Return the updated user data
      runValidators: true, // Run validators on the updated data
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'No user found with this ID!' }); // Respond if user not found
    }

    res.status(200).json(updatedUser); // Respond with the updated user data
  } catch (err) {
    console.error(err); // Log any errors for debugging
    res.status(400).send('Error updating user'); // Respond with a generic error message
  }
};

xports.createPassword = async (req, res) => {
  const { username, password, category, serviceName } = req.body;

  try {
    // Create and save a new password entry
    const newPasswordEntry = new Password({ username, password, category, serviceName });
    await newPasswordEntry.save();

    res.status(201).json({ message: "Password entry created successfully" });
  } catch (error) {
    console.error("Error creating password entry:", error);
    res.status(500).json({ message: "Error creating password entry", error });
  }
};

// Reset Master Password
exports.resetPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // Respond if user not found
    }

    // Hash the new password and save it
    const { salt, hash } = hashPassword(password);
    user.passwordHash = hash;
    user.salt = salt;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' }); // Respond with a success message
  } catch (err) {
    console.error('Error resetting password:', err); // Log any errors for debugging
    res.status(500).json({ message: 'Error resetting password. Please try again later.' }); // Respond with a generic error message
  }
};

// Delete User by ID and related lockers
exports.deleteUser = async (req, res) => {
  try {
    // Delete the user by ID
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'No user found with this ID!' }); // Respond if user not found
    }

    // Delete all lockers associated with the deleted user
    await Locker.deleteMany({ userId: deletedUser._id });
    res.status(200).json({ message: 'User and associated data deleted successfully' }); // Respond with a success message
  } catch (err) {
    console.error(err); // Log any errors for debugging
    res.status(400).send('Error deleting user'); // Respond with a generic error message
  }
};

// Get Current User from Token
exports.getCurrentUser = async (req, res) => {
  try {
    // Retrieve the current user from the token, excluding passwordHash and __v fields
    const user = await User.findById(req.user.userId).select('-passwordHash -__v');
    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // Respond if user not found
    }
    res.status(200).json(user); // Respond with the current user data
  } catch (err) {
    console.error(err); // Log any errors for debugging
    res.status(400).send('Error fetching current user'); // Respond with a generic error message
  }
};
