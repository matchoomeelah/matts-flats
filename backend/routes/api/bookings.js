// Create the router
const express = require('express');
const router = express.Router();

// Models for querying
const { Booking, Spot, SpotImage } = require('../../db/models');

// Authentiction/Authorization middleware
const { requireAuth, requireBookingOwner } = require('../../utils/auth');
const { validateBooking, endDateNotPast, bookingExists } = require('../../utils/validation');


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
router.put('/:bookingId', requireAuth, bookingExists, requireBookingOwner, validateBooking, endDateNotPast, async (req, res, next) => {
    const { bookingId } = req.params;
    const booking = await Booking.findByPk(bookingId);

    booking.set({ ...req.body });
    await booking.save();

    res.json(booking);
});


//
// Delete a Booking
//
router.delete('/:bookingId', requireAuth, bookingExists, async (req, res, next) => {
    const { bookingId } = req.params;
    const user = req.user;

    // Find current booking and associated spot
    const booking = await Booking.findByPk(bookingId);
    const spot = await Spot.findByPk(booking.spotId);

    // If not booking owner or spot owner...
    if (booking.userId !== user.id && spot.ownerId !== user.id) {
        const err = new Error();
        err.message = "Forbidden";
        res.status(403);
        return res.json(err);
    }

    // // If booking has already started...
    const nowTime = new Date().getTime();
    const startTime = new Date(booking.startDate).getTime();

    if (nowTime > startTime) {
        const err = new Error();
        err.message = "Bookings that have been started can't be deleted";
        res.status(403);
        return res.json(err);
    }

    // Delete it
    await booking.destroy();

    res.json({
        message: "Successfully deleted"
    });
});


module.exports = router;
