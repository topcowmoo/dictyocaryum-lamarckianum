require("dotenv").config({ path: __dirname + "/../.env" });
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

// Function to connect to MongoDB with proper options
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 20000,
    });
    console.log("MongoDB Atlas connected successfully");
  } catch (err) {
    console.error("MongoDB Atlas connection failed:", err);
    process.exit(1);
  }
};

// Function to seed users into the database
const seedUsers = async () => {
  const users = [
    {
      email: "test1@example.com",
      ...hashVaultPassword("Testpasswdad33ord1!"),
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

// Function to seed passwords into the database
const seedPasswords = async (users) => {
  const passwords = [
    {
      userId: "673ce321330e4e60c31768dc",
      serviceName: "Apple",
      site: "https://www.apple.com",
      username: "user1@mail.com",
      password: "AAdncrypdadsftedPassword1211!!",
      category: "Login",
    },
    {
      userId: "673ce321330e4e60c31768dd",
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

// Function to seed the entire database
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

// Function to start the seeding process
const startSeeding = async () => {
  await connectDB();
  await seedDB();
};

// Only run the seeding script if not in production
if (process.env.NODE_ENV !== "production") {
  startSeeding();
} else {
  console.log("Seeding skipped in production environment.");
}
