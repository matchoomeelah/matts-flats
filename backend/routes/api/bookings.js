// Create the router
const express = require('express');
const router = express.Router();

// Models for querying
const { Booking, Spot, SpotImage } = require('../../db/models');

// Authentiction/Authorization middleware
const { requireAuth, requireBookingOwner } = require('../../utils/auth');
const { validateBooking, checkBookingConflict, endDatePast, bookingExists } = require('../../utils/validation');


//
// Get all of the Current User's Bookings
//
router.get('/current', requireAuth, async (req, res, next) => {
    // Get the current user's id
    const userId = req.user.id;

    let bookings = await Booking.findAll({
        include: {
            model: Spot,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: {
                model: SpotImage,
                where: {
                    preview: true
                },
                required: false

            }
        },
        where: {
            userId
        }
    });

    // Specify the preview image
    bookings = bookings.map(booking => {
        let url = null;

        if (booking.Spot.SpotImages.length) {
            url = booking.Spot.SpotImages[0].url;
        }

        booking = booking.toJSON();
        booking.Spot.previewImage = url;
        delete booking.Spot.SpotImages;

        return booking;
    });

    res.json(bookings);
});


//
// Edit a Booking
//
router.put('/:bookingId', requireAuth, bookingExists, requireBookingOwner, validateBooking, endDatePast, async (req, res, next) => {
    const { bookingId } = req.params;

    const booking = await Booking.findByPk(bookingId);

    booking.set({ ...req.body });

    await booking.save();

    res.json(booking);
});



module.exports = router;
