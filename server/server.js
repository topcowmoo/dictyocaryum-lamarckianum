const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

mongoose.connect('mongodb://localhost:27017/vpl', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Connection failed', err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
