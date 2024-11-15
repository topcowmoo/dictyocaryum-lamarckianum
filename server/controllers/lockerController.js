const Locker = require('../models/Locker'); // Import the Locker model

// Controller function to get all password entries
exports.getAllPasswords = async (req, res) => {
  try {
    // Retrieve all Locker documents from the database
    const lockers = await Locker.find({});
    res.status(200).json(lockers); // Respond with the retrieved lockers
  } catch (err) {
    res.status(500).json({ message: 'Error fetching lockers' }); // Respond with a 500 status and error message
  }
};

// Controller function to create a new password entry
exports.createPassword = async (req, res) => {
  try {
    // Extract data from the request body
    const { userId, serviceName, username, password } = req.body;

    // Validate required fields
    if (!userId || !serviceName) {
      return res.status(400).json({ message: 'userId and serviceName are required.' }); // Respond with a 400 status if validation fails
    }

    // Create a new Locker document and save it to the database
    const newLocker = new Locker({ userId, serviceName, username, password });
    await newLocker.save();
    res.status(201).json(newLocker); // Respond with the newly created locker entry
  } catch (err) {
    res.status(500).json({ message: 'Error creating password entry' }); // Respond with a 500 status and error message
  }
};

// Controller function to update an existing password entry
exports.updatePassword = async (req, res) => {
  try {
    // Find the locker entry by ID and update it with the new data from the request body
    const updatedLocker = await Locker.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLocker) return res.status(404).json({ message: 'Locker not found' }); // Respond with a 404 status if the entry is not found
    res.status(200).json(updatedLocker); // Respond with the updated locker entry
  } catch (err) {
    res.status(500).json({ message: 'Error updating locker' }); // Respond with a 500 status and error message
  }
};

// Controller function to delete a password entry
exports.deletePassword = async (req, res) => {
  try {
    // Find the locker entry by ID and delete it
    const deletedLocker = await Locker.findByIdAndDelete(req.params.id);
    if (!deletedLocker) return res.status(404).json({ message: 'Locker not found' }); // Respond with a 404 status if the entry is not found
    res.status(200).json({ message: 'Locker deleted successfully' }); // Respond with a success message
  } catch (err) {
    res.status(500).json({ message: 'Error deleting locker' }); // Respond with a 500 status and error message
  }
};
