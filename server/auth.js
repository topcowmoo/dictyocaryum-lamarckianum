const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library for creating and verifying tokens
const crypto = require('crypto'); // Import the crypto library for hashing passwords

// Function to generate a JWT token
// The token contains the user's ID and email, and expires in 7 hours
exports.generateToken = (user) => {
  return jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '24h', // Token expiration time set to 24 hours
  });
};

// Function to hash a password using PBKDF2 (Password-Based Key Derivation Function 2)
// Generates a salt and hashes the password using the salt
exports.hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('hex'); // Generate a 16-byte random salt in hexadecimal format
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex'); // Hash the password with PBKDF2
  return { salt, hash }; // Return the salt and the hashed password
};

// Function to verify if a given password matches the stored hash and salt
// Hashes the input password with the stored salt and compares it to the stored hash
exports.verifyPassword = (password, hash, salt) => {
  const newHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex'); // Hash the input password
  return newHash === hash; // Return true if the hashed passwords match, otherwise false
};

// Middleware to authenticate a JWT token from the HTTP cookie
// Verifies the token and attaches the decoded user info to the request object
exports.authenticateToken = (req, res, next) => {
  const token = req.cookies.authToken; // Or wherever your token is stored
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user info (including userId) to the request
    next();
  } catch (err) {
    res.status(401).send('Invalid token');
  }
};
