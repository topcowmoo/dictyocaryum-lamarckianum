const express = require("express"); // Import the Express module
const auth = require("../../auth"); // Import the authentication middleware
const User = require("../../models/User"); // Import the User model
const router = express.Router(); // Create an Express router instance

// Public Routes

// Signup Route
// Handles user registration
router.post("/signup", async (req, res) => {
  const { email, password } = req.body; // Extract email and password from the request body

  try {
    // Hash the password
    const { hash, salt } = auth.hashPassword(password);
    console.log("Password hashed successfully"); // Debugging: log successful password hashing

    // Create a new user with the hashed password and save to the database
    const newUser = new User({ email, passwordHash: hash, salt });
    await newUser.save();
    console.log("User saved successfully"); // Debugging: log successful user saving

    // Generate an authentication token and set it as a cookie
    const token = auth.generateToken(newUser);
    res.cookie("authToken", token, {
      httpOnly: true, // Make the cookie inaccessible to client-side JavaScript
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "lax", // Restrict cross-site cookie sending
      maxAge: 60 * 60 * 1000, // Set cookie expiration time to 1 hour
    });

    res.status(201).json({ message: "Signup successful" }); // Respond with success message
  } catch (error) {
    console.error("Error during signup:", error); // Log the error for debugging
    res.status(500).json({ message: "Error during signup", error }); // Respond with error message
  }
});

// Login Route
// Handles user login
router.post("/login", async (req, res) => {
  const { email, password } = req.body; // Extract email and password from the request body
  try {
    // Find the user by email and verify the password
    const user = await User.findOne({ email });
    if (!user || !auth.verifyPassword(password, user.passwordHash, user.salt)) {
      return res.status(401).send("Invalid email or password"); // Respond with unauthorized if invalid
    }

    // Generate an authentication token and set it as a cookie
    const token = auth.generateToken(user);
    res.cookie("authToken", token, {
      httpOnly: true, // Make the cookie inaccessible to client-side JavaScript
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 60 * 60 * 1000, // Set cookie expiration time to 1 hour
    });

    res.status(200).json({ message: "Login successful" }); // Respond with success message
  } catch (error) {
    res.status(500).json({ message: "Error during login", error }); // Respond with error message
  }
});

// Logout Route
// Handles user logout
router.post("/logout", (req, res) => {
  res.clearCookie("authToken"); // Clear the authentication token cookie
  res.status(200).json({ message: "Logout successful" }); // Respond with success message
});

// Reset Password Route
// Handles password reset for users who forgot their password
router.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body; // Extract email and new password from the request body
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" }); // Respond with not found if user doesn't exist

    // Hash the new password and update the user's password
    const { hash, salt } = auth.hashPassword(newPassword);
    user.passwordHash = hash;
    user.salt = salt;
    await user.save();

    res.status(200).json({ message: "Password reset successful" }); // Respond with success message
  } catch (error) {
    res.status(500).json({ message: "Error resetting password", error }); // Respond with error message
  }
});

// Change Password Route
// Handles password change for authenticated users
router.post("/change-password", auth.authenticateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body; // Extract old and new passwords from the request body

  try {
    // Find the authenticated user by their ID
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" }); // Respond with not found if user doesn't exist

    // Verify the old password
    if (!auth.verifyPassword(oldPassword, user.passwordHash, user.salt)) {
      return res.status(401).json({ message: "Incorrect old password" }); // Respond with unauthorized if old password is incorrect
    }

    // Hash the new password and update the user's password
    const { hash, salt } = auth.hashPassword(newPassword);
    user.passwordHash = hash;
    user.salt = salt;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" }); // Respond with success message
  } catch (error) {
    res.status(500).json({ message: "Error changing password", error }); // Respond with error message
  }
});

// Protected Routes (require authenticateToken middleware)

// Verify Token Route
// Verifies if the user is authenticated
router.get("/auth/verify", auth.authenticateToken, (req, res) => {
  res.status(200).json({ message: "Authenticated" }); // Respond with success if authenticated
});

// User Profile Route
// Retrieves the profile of the authenticated user
router.get("/profile", auth.authenticateToken, async (req, res) => {
  try {
    // Find the authenticated user by their ID
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" }); // Respond with not found if user doesn't exist
    res.status(200).json({ user }); // Respond with user data
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user profile", error }); // Respond with error message
  }
});

module.exports = router; // Export the router to be used in the main API setup
