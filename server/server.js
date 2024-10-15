const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8001;
const routes = require('./routes');
require('dotenv').config({ path: '../.env' }); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// Use the MongoDB Atlas connection string from the .env file
mongoose.connect(process.env.MONGO_URI,
).then(() => console.log('MongoDB Atlas connected successfully'))
  .catch((err) => console.log('MongoDB Atlas connection failed', err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
