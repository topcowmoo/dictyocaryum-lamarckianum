const { Locker, User } = require('../models');

const lockerController = {
  // Get all passwords for the logged-in user
  getAllPasswords({ user }, res) {
    Locker.find({ userId: user._id })
      .select('-__v')
      .then((passwords) => res.status(200).json(passwords))
      .catch((err) => res.status(400).send(err));
  },

  // Add a new password entry
  createPassword({ body, user }, res) {
    Locker.create({ ...body, userId: user._id })
      .then((newPassword) => res.status(201).json(newPassword))
      .catch((err) => res.status(400).send(err));
  },

  // Update an existing password entry
  updatePassword({ params, body, user }, res) {
    Locker.findOneAndUpdate(
      { _id: params.id, userId: user._id },
      body,
      { new: true, runValidators: true }
    )
      .then((updatedPassword) => {
        if (!updatedPassword) {
          return res.status(404).json({ message: 'No password found with this id!' });
        }
        res.status(200).json(updatedPassword);
      })
      .catch((err) => res.status(400).send(err));
  },

  // Delete a password entry
  deletePassword({ params, user }, res) {
    Locker.findOneAndDelete({ _id: params.id, userId: user._id })
      .then((deletedPassword) => {
        if (!deletedPassword) {
          return res.status(404).json({ message: 'No password found with this id!' });
        }
        res.status(200).json({ message: 'Password deleted!' });
      })
      .catch((err) => res.status(400).send(err));
  },
};

module.exports = lockerController;
