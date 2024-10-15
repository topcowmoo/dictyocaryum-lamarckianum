const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8001;
const routes = require('./routes');
require('dotenv').config({ path: '../.env' }); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  // Serve the React app for all non-API routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
  });
}

// Use the MongoDB Atlas connection string from the .env file
mongoose.connect(process.env.MONGO_URI,
).then(() => console.log('MongoDB Atlas connected successfully'))
  .catch((err) => console.log('MongoDB Atlas connection failed', err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
