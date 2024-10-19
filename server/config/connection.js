const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)

  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Connection failed", err));

module.exports = mongoose.connection;
