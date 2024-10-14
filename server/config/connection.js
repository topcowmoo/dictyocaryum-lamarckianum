const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/vpl")

  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Connection failed", err));

module.exports = mongoose.connection;
