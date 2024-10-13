const { User, Locker } = require('../models');

const userController = {
  // Get all users
  getAllUser(req, res) {
    User.find({})
      .select('-passwordHash -__v')
      .sort({ _id: -1 })
      .then((dbUserData) => res.status(200).json(dbUserData))
      .catch((err) => res.status(400).send(err));
  },

  // Get a single user by ID
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .select('-passwordHash -__v')
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.status(200).json(dbUserData);
      })
      .catch((err) => res.status(400).send(err));
  },

  // Create a user
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.status(201).json(dbUserData))
      .catch((err) => res.status(400).send(err));
  },

  // Update user by ID
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.status(200).json(dbUserData);
      })
      .catch((err) => res.status(400).send(err));
  },

  // Delete user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        // Optional: Delete related locker entries (passwords)
        return Locker.deleteMany({ userId: dbUserData._id });
      })
      .then(() => res.status(200).json({ message: 'User and associated passwords deleted!' }))
      .catch((err) => res.status(400).send(err));
  },
};

module.exports = userController;
