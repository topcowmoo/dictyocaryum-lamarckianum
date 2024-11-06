const express = require('express');
const auth = require('../../auth');
const User = require('../../models/User'); // Adjust for your User model
const router = express.Router();

// Public Routes

// Signup Route
// Signup Route
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  console.log("Signup request received with:", email, password); // Debugging

  try {
    const { hash, salt } = auth.hashPassword(password);
    console.log("Password hashed successfully"); // Debugging

    const newUser = new User({ email, passwordHash: hash, salt });
    await newUser.save();
    console.log("User saved successfully"); // Debugging

    const token = auth.generateToken(newUser);
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000,
    });

    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    console.error("Error during signup:", error); // Log the error
    res.status(500).json({ message: 'Error during signup', error });
  }
});


// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !auth.verifyPassword(password, user.passwordHash, user.salt)) {
      return res.status(401).send('Invalid email or password');
    }

    const token = auth.generateToken(user);
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error });
  }
});

// Logout Route
router.post('/logout', (req, res) => {
  res.clearCookie('authToken');
  res.status(200).json({ message: 'Logout successful' });
});

// Reset Password Route
router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { hash, salt } = auth.hashPassword(newPassword);
    user.hash = hash;
    user.salt = salt;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password', error });
  }
});

// Protected Routes (require authenticateToken middleware)

// Verify Token Route
router.get('/auth/verify', auth.authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Authenticated' });
});

// User Profile Route (Example of a protected route)
router.get('/profile', auth.authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user profile', error });
  }
});

module.exports = router;
