// Make our router
const express = require('express')
const router = express.Router();

// Inport for encryption algorithm
const bcrypt = require('bcryptjs');

// Imports for authorizing users
const { setTokenCookie, requireAuth } = require('../../utils/auth');

// Import for reference to the User model to find records
const { User } = require('../../db/models');


//
// SIGNUP
//
router.post('/', async (req, res, next) => {
    // Get the body params and hash a new password
    const { username, email, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password);

    // Create a new user with the hashedPassword stored
    const user = await User.create({username, email, hashedPassword});

    // Create a user object that doesn't have the password in it
    const safeUser = {
        id: user.id,
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
