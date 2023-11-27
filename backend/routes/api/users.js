// Make our router
const express = require('express')
const router = express.Router();

// Inport for encryption algorithm
const bcrypt = require('bcryptjs');

// Imports for authorizing users
const { setTokenCookie, requireAuth } = require('../../utils/auth');

// Import validation check method and our custome handleValidationErrors message
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// Import for reference to the User model to find records
const { User } = require('../../db/models');


//
// Validation for SIGNUP
//
const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    check('firstName')
      .exists({checkFalsy: true })
      .withMessage('Must specify first name'),
    check('lastName')
      .exists({checkFalsy: true })
      .withMessage('Must specify last name'),
    handleValidationErrors
  ];


//
// SIGNUP
//
router.post('/', validateSignup, async (req, res, next) => {
    // Get the body params and hash a new password
    const { username, firstName, lastName, email, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password);

    // Create a new user with the hashedPassword stored
    const user = await User.create({username, firstName, lastName, email, hashedPassword});

    // Create a user object that doesn't have the password in it
    const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username
    };

    // Set the token for the response
    await setTokenCookie(res, safeUser);

    res.json({
        user: safeUser
    });
});


module.exports = router;
