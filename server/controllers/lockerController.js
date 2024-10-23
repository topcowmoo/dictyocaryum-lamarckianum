const Locker = require('../models/Locker');

exports.getAllPasswords = async (req, res) => {
  try {
    const lockers = await Locker.find({});
    res.status(200).json(lockers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching lockers' });
  }
};

exports.createPassword = async (req, res) => {
  try {
    console.log('Request Body:', req.body);  // Debugging line

    const { userId, serviceName, username, password } = req.body;

    if (!userId || !serviceName) {
      return res.status(400).json({ message: 'userId and serviceName are required.' });
    }

    const newLocker = new Locker({ userId, serviceName, username, password });
    await newLocker.save();
    res.status(201).json(newLocker);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating password entry' });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const updatedLocker = await Locker.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLocker) return res.status(404).json({ message: 'Locker not found' });
    res.status(200).json(updatedLocker);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating locker' });
  }
};

exports.deletePassword = async (req, res) => {
  try {
    const deletedLocker = await Locker.findByIdAndDelete(req.params.id);
    if (!deletedLocker) return res.status(404).json({ message: 'Locker not found' });
    res.status(200).json({ message: 'Locker deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting locker' });
  }
};
