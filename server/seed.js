require("dotenv").config({ path: __dirname + "/../.env" }); // Load environment variables from the .env file
const mongoose = require("mongoose"); // Import Mongoose for interacting with MongoDB
const crypto = require("crypto"); // Import the crypto library for password hashing
const User = require("./models/User"); // Import the User model
const Locker = require("./models/Locker"); // Import the Locker model

// Function to hash passwords using PBKDF2
const hashVaultPassword = (password) => {
  const salt = crypto.randomBytes(16).toString("hex"); // Generate a random salt
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex"); // Hash the password with PBKDF2
  return { passwordHash: hash, salt }; // Return the hashed password and salt
};

// Function to connect to MongoDB with proper options
const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI from the .env file with a 20-second timeout
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 20000, // Extend timeout to 20 seconds
    });
    console.log("MongoDB Atlas connected successfully"); // Log success message
  } catch (err) {
    console.error("MongoDB Atlas connection failed:", err); // Log error message if connection fails
    process.exit(1); // Exit the process if connection fails
  }
};

// Function to seed users into the database
const seedUsers = async () => {
  // Array of user objects with hashed passwords
  const users = [
    {
      email: "test1@example.com",
      ...hashVaultPassword("Testpasswdad33ord1!"), // Hash the password and include both `passwordHash` and `salt`
    },
    {
      email: "test2@example.com",
      ...hashVaultPassword("Testpasswdad33odfads??rd1!"),
    },
    {
      email: "tesdasf1@example.com",
      ...hashVaultPassword("Testpddsafsaasswdad33ord1!"),
    },
    {
      email: "user2@mail.com",
      ...hashVaultPassword("Password1234345&"),
    },
  ];

  try {
    console.log("Seeding users..."); // Log message for seeding users
    await User.deleteMany({}); // Delete all existing users from the database
    console.log("Existing users deleted."); // Log success message for deletion
    const insertedUsers = await User.insertMany(users); // Insert the new users
    console.log("Users seeded successfully:", insertedUsers); // Log success message and inserted users
    return insertedUsers; // Return the inserted users for later use
  } catch (error) {
    console.error(`Error seeding users: ${error.message}`); // Log error message
    throw error; // Throw the error to handle it in the seeding process
  }
};

// Function to seed passwords into the database
const seedPasswords = async (users) => {
  // Array of password objects, each linked to a user by `userId`
  const passwords = [
    {
      userId: "673ce321330e4e60c31768dc", // Hardcoded user ID as a string
      serviceName: "Apple",
      site: "https://www.apple.com",
      username: "user1@mail.com",
      password: "AAdncrypdadsftedPassword1211!!",
      category: "Login",
    },
    {
      userId: "673ce321330e4e60c31768dd", // Hardcoded user ID as a string
      serviceName: "AmericanExpress",
      site: "https://www.americanexpress.com",
      username: "user2@mail.com",
      password: "AAdncrypdadfasdsftedPassword1211!!",
      category: "Cards",
    },
    {
      userId:"673ce321330e4e60c31768dd",
      serviceName: "Amazon",
      site: "www.amazon.com",
      username: "amazonlover",
      password: "EncryptedPadafasdfassword1211!!",
      category: "Entertainment",
    },
    {
      userId: "673ce321330e4e60c31768dc",
      serviceName: "Meta",
      site: "www.meta.com",
      username: "metametahohoho",
      password: "EndcryptedPadafasdfassword1211!!",
      category: "Entertainment",
    },
  ];

  try {
    console.log("Seeding passwords..."); // Log message for seeding passwords
    await Locker.deleteMany({}); // Delete all existing password entries from the database
    console.log("Existing lockers deleted."); // Log success message for deletion
    await Locker.insertMany(passwords); // Insert the new password entries
    console.log("Passwords seeded successfully."); // Log success message
  } catch (error) {
    console.error(`Error seeding passwords: ${error.message}`); // Log error message
    throw error; // Throw the error to handle it in the seeding process
  }
};

// Function to seed the entire database
const seedDB = async () => {
  try {
    console.log("Seeding database..."); // Log message for starting the seeding process
    const users = await seedUsers(); // Seed users and get the inserted users
    await seedPasswords(users); // Seed passwords using the inserted users
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`); // Log error message
  } finally {
    try {
      await mongoose.connection.close(); // Close the MongoDB connection
      console.log("MongoDB connection closed."); // Log success message for closing the connection
    } catch (err) {
      console.error("Error closing the connection:", err); // Log error if closing fails
    }
  }
};

// Function to start the seeding process
const startSeeding = async () => {
  await connectDB(); // Ensure the MongoDB connection is established
  await seedDB(); // Run the seeding logic
};

startSeeding(); // Start the seeding process
