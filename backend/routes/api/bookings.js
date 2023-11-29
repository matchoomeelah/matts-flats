// Create the router
const express = require('express');
const router = express.Router();

// Models for querying
const { Booking } = require('../../db/models');

// Authentiction/Authorization middleware
const { requireAuth } = require('../../utils/auth');


//
// Get all of the Current User's Bookings
//
router.get('/current', requireAuth, async (req, res, next) => {
    // Get the current user's id
    const userId = req.user.id;

    const bookings = await Booking.findAll({
        where: {
            userId
        }
    });

    res.json(bookings);
});




module.exports = router;
