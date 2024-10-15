require('dotenv').config({ path: '../.env' }); 
const mongoose = require("mongoose");
const crypto = require("crypto");
const User = require("./models/User");
const Locker = require("./models/Locker");


// Correct the connection string to use the environment variable
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Atlas connected successfully'))
  .catch((err) => console.log('MongoDB Atlas connection failed', err));

// Function to hash passwords using PBKDF2
const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  
  // Return passwordHash and salt
  return { passwordHash: hash, salt };
};

// Seed Users
const seedUsers = async () => {
  const users = [
    {
      username: "testuser1",
      email: "test1@example.com",
      ...hashPassword("testpassword1"),
    },
    {
      username: "testuser2",
      email: "test2@example.com",
      ...hashPassword("testpassword2"),
    },
  ];

  // Insert users into the database
  await User.deleteMany(); // Clear any existing users
  const insertedUsers = await User.insertMany(users); // Insert new users
  console.log("Users seeded successfully");

  return insertedUsers; // Return users with IDs
};

// Seed Passwords Using User IDs
const seedPasswords = async (users) => {
  const passwords = [
    {
      userId: users[0]._id, // Use the actual _id from inserted users
      serviceName: "Google", // Add serviceName field
      site: "Google",
      username: "user1@gmail.com",
      password: "EncryptedPasswordHere", // Encrypted password
    },
    {
      userId: users[1]._id, // Use the actual _id from inserted users
      serviceName: "Facebook", // Add serviceName field
      site: "Facebook",
      username: "user1@facebook.com",
      password: "EncryptedPasswordHere", // Encrypted password
    },
  ];

  // Insert the passwords into the database
  await Locker.deleteMany(); // Clear any existing password data
  await Locker.insertMany(passwords); // Insert the new password data
  console.log("Passwords seeded successfully");
};

// Seed the database and close the connection
const seedDB = async () => {
  try {
    const users = await seedUsers(); // Seed users and get their IDs
    await seedPasswords(users); // Seed passwords using the user IDs
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close(); // Close the connection when done
  }
};

// Run the seed script
seedDB();
