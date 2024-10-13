const router = require('express').Router();

const {
    getAllPasswords,
    createPassword,
    updatePassword,
    deletePassword,
} = require('../../controllers/lockerController');

// Route for getting all passwords
router.route('/')
.get(getAllPasswords)
.post(createPassword)
.put(updatePassword)
.delete(deletePassword);

module.exports = router;

