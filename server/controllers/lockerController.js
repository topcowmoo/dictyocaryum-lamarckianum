const Locker = require("../models/Locker"); // Import the Locker model

// Controller function to get all password entries
exports.getAllPasswords = async (req, res) => {
  try {
    // Retrieve the userId from the authenticated user
    const userId = req.user.userId;

    // Filter lockers by userId to retrieve only the current user's entries
    const lockers = await Locker.find({ userId });

    // Respond with the retrieved lockers
    res.status(200).json(lockers);
  } catch (err) {
    console.error("Error fetching lockers:", err);
    res.status(500).json({ message: "Error fetching lockers" }); // Respond with a 500 status and error message
  }
};

// Controller function to create a new password entry
exports.createPassword = async (req, res) => {
  const { name, username, password, category } = req.body;

  // Check if required fields are provided
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    // Assume that req.user.userId is set by your auth middleware
    const userId = req.user.userId;
    const newLockerEntry = new Locker({ name, userId, username, password, category });

    await newLockerEntry.save();

    res.status(201).json({ message: "Password entry created successfully" });
  } catch (error) {
    console.error("Error creating password entry:", error);
    res.status(500).json({ message: "Error creating password entry", error });
  }
};

// Controller function to update an existing password entry
exports.updatePassword = async (req, res) => {
  try {
    // Find the locker entry by ID and update it with the new data from the request body
    const updatedLocker = await Locker.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedLocker) {
      return res.status(404).json({ message: "Locker not found" }); // Respond with a 404 status if the entry is not found
    }

    res.status(200).json(updatedLocker); // Respond with the updated locker entry
  } catch (err) {
    console.error("Error updating locker:", err);
    res.status(500).json({ message: "Error updating locker" }); // Respond with a 500 status and error message
  }
};

// Controller function to "delete" (soft delete) a password entry
exports.deletePassword = async (req, res) => {
  try {
    const locker = await Locker.findById(req.params.id);

    if (!locker) {
      return res.status(404).json({ message: "Locker not found" });
    }
console.log("Deleting entry:", locker);
    const deletedLocker = await Locker.findByIdAndUpdate(
      req.params.id,
      {
        category: "Deleted",
        previousCategory: locker.category, // ✅ Save the current category
      },
      { new: true }
    );

    res.status(200).json({ message: "Locker marked as deleted successfully", deletedLocker });
  } catch (err) {
    console.error("Error deleting locker:", err);
    res.status(500).json({ message: "Error deleting locker" });
  }
};


// Controller function to restore a deleted password entry
exports.restorePassword = async (req, res) => {
  try {
    const locker = await Locker.findById(req.params.id);

    if (!locker) {
      return res.status(404).json({ message: "Locker not found" });
    }
    console.log("Restoring entry:", locker);

    const updatedLocker = await Locker.findByIdAndUpdate(
      req.params.id,
      {
        category: locker.previousCategory || "All",
      },
      { new: true }
    );

    res.status(200).json(updatedLocker);
  } catch (err) {
    console.error("Error restoring locker entry:", err);
    res.status(500).json({ message: "Error restoring locker entry" });
  }
};

