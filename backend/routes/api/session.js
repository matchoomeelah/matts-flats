// Make our router
const express = require('express');
const router = express.Router();

// Import for comparison operators
const { Op } = require('sequelize');

// Import for hashing function
const bcrypt = require('bcryptjs');

// Imports for authorizing users
const { setTokenCookie, restoreUser } = require('../../utils/auth');

// Import for reference to the User model to find records
const { User } = require('../../db/models');


//
// LOGIN ROUTE
//
router.post('/', async (req, res, next) => {
    const { credential, password } = req.body;

    // Find a user with the username/email specified in the body
    const user = await User.unscoped().findOne({
        where: {
            [Op.or]: {
                username: credential,
                email: credential
            }
        }
    });

    // If there is no user, or there is an incorrect password, create an error and pass it to the next error handling middleware
    if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = { credential: 'The provided credentials were invalid.' };
        return next(err);
    }

    // The logged in user's info to put in the res, with NO hashedPassword
    const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
    };

    // Use the function we made in auth.js to set the token on our response
    await setTokenCookie(res, safeUser);

    return res.json({
        user: safeUser
    });

});


//
// LOGOUT ROUTE
//
router.delete('/', (req, res, next) => {
    // Delete the token cookie and return message of success
    res.clearCookie('token');
    return res.json({ message: 'success' });
});


module.exports = router;
