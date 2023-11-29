const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewsRouter = require('./reviews.js');
const bookingsRouter = require('./bookings.js');
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
router.use(restoreUser);

// For current user/session requests
router.use('/session', sessionRouter);

// For validating and signing up users
router.use('/users', usersRouter);

// For requests pertaining to spots
router.use('/spots', spotsRouter);

// For requests pertaining to reviews
router.use('/reviews', reviewsRouter);

// For requests pertaining to bookings
router.use('/bookings', bookingsRouter);


router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
