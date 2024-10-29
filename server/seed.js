require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require("mongoose");
const crypto = require("crypto");
const User = require("./models/User");
const Locker = require("./models/Locker");

// Function to hash passwords using PBKDF2
const hashVaultPassword = (password) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return { passwordHash: hash, salt };
};

// Connect to MongoDB with proper options
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000, // Extend timeout to 30 seconds
    });
    console.log("MongoDB Atlas connected successfully");
  } catch (err) {
    console.error("MongoDB Atlas connection failed:", err);
    process.exit(1); // Exit if connection fails
  }
};

// Seed Users
const seedUsers = async () => {
  const users = [
    {
      email: "test1@example.com",
      ...hashVaultPassword("Testpasswdad33ord1!"), // Includes both `passwordHash` and `salt`
    },
    {
      email: "test2@example.com",
      ...hashVaultPassword("Testpasswdad33odfads??rd1!"), // Includes both `passwordHash` and `salt`
    },
  ];

  try {
    console.log("Seeding users...");
    await User.deleteMany({});
    console.log("Existing users deleted.");
    const insertedUsers = await User.insertMany(users);
    console.log("Users seeded successfully:", insertedUsers);
    return insertedUsers;
  } catch (error) {
    console.error(`Error seeding users: ${error.message}`);
    throw error;
  }
};

// Seed Passwords
const seedPasswords = async (users) => {
  const passwords = [
    {
      userId: users[0]._id,
      serviceName: "Google",
      site: "https://www.google.com",
      username: "user1@gmail.com",
      password: "EncryptedPassword1211!!",
      category: "login",
    },
    {
      userId: users[0]._id,
      serviceName: "Chase Bank",
      site: "https://chase.com",
      username: "user1@chase.com",
      password: "EncryptedPassword1211!!",
      category: "cards",
    },
    {
      userId: users[0]._id,
      serviceName: "Home WiFi",
      site: "WiFi Network",
      username: "WiFiUser",
      password: "EncryptedPassword1211!!",
      category: "wi-fi",
    },
    {
      userId: users[0]._id,
      serviceName: "Driver's License",
      site: "DMV",
      username: "user1_license",
      password: "EncryptedPassword1211!!",
      category: "identification",
    },
    {
      userId: users[0]._id,
      serviceName: "Netflix",
      site: "https://www.netflix.com",
      username: "user1@gmail.com",
      password: "EncryptedPassword1211!!",
      category: "entertainment",
    },
    {
      userId: users[0]._id,
      serviceName: "Unknown Service",
      site: "https://www.example.com",
      username: "unknown_user",
      password: "EncryptedPassword1211!!",
      category: "deleted",
    },
  ];

  try {
    console.log("Seeding passwords...");
    await Locker.deleteMany({});
    console.log("Existing lockers deleted.");
    await Locker.insertMany(passwords);
    console.log("Passwords seeded successfully.");
  } catch (error) {
    console.error(`Error seeding passwords: ${error.message}`);
    throw error;
  }
};

// Seed the Database
const seedDB = async () => {
  try {
    console.log("Seeding database...");
    const users = await seedUsers();
    await seedPasswords(users);
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`);
  } finally {
    try {
      await mongoose.connection.close();
      console.log("MongoDB connection closed.");
    } catch (err) {
      console.error("Error closing the connection:", err);
    }
  }
};

// Run the seeding process
const startSeeding = async () => {
  await connectDB(); // Ensure connection is established first
  await seedDB();    // Run seeding logic
};

startSeeding();
