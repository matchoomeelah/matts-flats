const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewsRouter = require('./reviews.js');
const bookingsRouter = require('./bookings.js');
const spotImagesRouter = require('./spot-images.js');
const reviewImagesRouter = require('./review-images.js')
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
router.use(restoreUser);

// For current user/session requests
router.use('/session', sessionRouter);

// For validating and signing up Users
router.use('/users', usersRouter);

// For requests pertaining to Spots
router.use('/spots', spotsRouter);

// For requests pertaining to Reviews
router.use('/reviews', reviewsRouter);

// For requests pertaining to Bookings
router.use('/bookings', bookingsRouter);

// For requests pertaining to SpotImages
router.use('/spot-images', spotImagesRouter);

// For requests pertaining to ReviewImages
router.use('/review-images', reviewImagesRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
