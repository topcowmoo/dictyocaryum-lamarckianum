require('dotenv').config({ path: __dirname + '/../.env' }); 
const mongoose = require("mongoose");
const crypto = require("crypto");
const User = require("./models/User");
const Locker = require("./models/Locker");

// Log the MongoDB URI for debugging
console.log("Mongo URI:", process.env.MONGODB_URI);

// Connect to MongoDB using the URI from the .env file
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Atlas connected successfully'))
  .catch((err) => {
    console.error('MongoDB Atlas connection failed:', err);
    process.exit(1); // Exit if connection fails
  });

// Function to hash passwords using PBKDF2
const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return { passwordHash: hash, salt };
};

// Seed Users
const seedUsers = async () => {
  const users = [
    {
      email: "test1@example.com",
      ...hashPassword("Testpassword1!"),
    },
    {
      email: "test2@example.com",
      ...hashPassword("Testpassword2!"),
    },
  ];

  try {
    console.log("Seeding users...");

    // Clear existing users
    await User.deleteMany({});
    console.log("Existing users deleted.");

    // Insert new users
    const insertedUsers = await User.insertMany(users);
    console.log("Users seeded successfully:", insertedUsers);

    return insertedUsers;
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
};

// Seed Passwords using User IDs
const seedPasswords = async (users) => {
  const passwords = [
    {
      userId: users[0]._id,
      serviceName: "Google",
      site: "Google",
      username: "user1@gmail.com",
      password: "EncryptedPasswordHere", // Example encrypted password
    },
    {
      userId: users[1]._id,
      serviceName: "Facebook",
      site: "Facebook",
      username: "user2@facebook.com",
      password: "EncryptedPasswordHere", // Example encrypted password
    },
  ];

  try {
    console.log("Seeding passwords...");

    // Clear existing lockers
    await Locker.deleteMany({});
    console.log("Existing lockers deleted.");

    // Insert new passwords
    await Locker.insertMany(passwords);
    console.log("Passwords seeded successfully.");
  } catch (error) {
    console.error("Error seeding passwords:", error);
    throw error;
  }
};

// Seed the database
const seedDB = async () => {
  try {
    console.log("Seeding database...");
    const users = await seedUsers();
    await seedPasswords(users);
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close(); // Close the connection when done
  }
};

// Run the seed script
seedDB();
