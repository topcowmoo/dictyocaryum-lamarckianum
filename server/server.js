const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./routes');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); // Load .env file

const app = express();
const PORT = process.env.PORT || 8001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
  });
}

// Use MongoDB connection from .env file
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Atlas connected successfully'))
  .catch((err) => console.error('MongoDB Atlas connection failed:', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
