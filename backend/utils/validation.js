const { validationResult, check } = require('express-validator');
const { Spot, Review, Booking } = require('../db/models');

//
// Middleware for formatting errors from express-validator middleware
//
const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach(error => errors[error.path] = error.msg);

    const err = Error("Bad request");
    err.errors = errors;
    err.status = 400;
    next(err);
  }
  next();
}

//
// Check that Spot exists
//
const spotExists = async (req, res, next) => {
  const { spotId } = req.params;
  if (!await Spot.findByPk(spotId)) {
    const err = new Error();
    err.message = "Spot couldn't be found";
    res.status(404);
    return res.json(err);
  }

  next();
}


//
// Check that Review exists
//
const reviewExists = async (req, res, next) => {
  const { reviewId } = req.params;
  if (!await Review.findByPk(reviewId)) {
    const err = new Error();
    err.message = "Review couldn't be found";
    res.status(404);
    return res.json(err);
  }

  next();
}

//
// Check that Booking exists
//
const bookingExists = async (req, res, next) => {
  const { bookingId } = req.params;
  if (!await Booking.findByPk(bookingId)) {
    const err = new Error();
    err.message = "Booking couldn't be found";
    res.status(404);
    return res.json(err);
  }

  next();
}


//
//  Check Booking endDate strictly after startDate
//
const endDateAfterStartDate = (req, res, next) => {
  let { startDate, endDate } = req.body;
  startDate = new Date(startDate);
  endDate = new Date(endDate);

  if (endDate.getTime() <= startDate.getTime()) {
    const err = new Error("Bad request");
    err.errors = { "endDate": "endDate cannot be on or before startDate" }
    err.status = 400;
    // err.title = "Bad request";
    return next(err);
  }

  next();
}


//
// Check for conflicting Booking
//
const checkBookingConflict = async function (req, res, next) {
  let { spotId, bookingId } = req.params;
  const { startDate, endDate } = req.body;
  startTime = new Date(startDate).getTime();
  endTime = new Date(endDate).getTime();


  // For when only the bookingId specified
  if (!spotId) {
    const b = await Booking.findByPk(bookingId);
    spotId = b.spotId;
  }

  const spot = await Spot.findByPk(spotId, {
    include: {
      model: Booking,
      attributes: ["id", "startDate", "endDate"]
    }
  });

  // Check for conflicts
  for (let booking of spot.Bookings) {
    const currStartTime = new Date(booking.startDate);
    const currEndTime = new Date(booking.endDate);
    const errors = {};

    // Bypass conflict if for same booking
    if (parseInt(bookingId) === booking.id) {
      continue;
    }

    // startDate is within current booking dates
    if (startTime >= currStartTime && startTime <= currEndTime) {
      errors.startDate = "Start date conflicts with an existing booking";
    }

    // endTime is within current booking dates
    if (endTime >= currStartTime && endTime <= currEndTime) {
      errors.endDate = "End date conflicts with an existing booking";
    }

    // startDate and endDate contain current booking dates
    if (startTime < currStartTime && endTime > currEndTime) {
      errors.message = "Existing booking within date range specified";
    }

    // Return error if there are conflicts
    if (Object.keys(errors).length) {
      const err = new Error("Sorry, this spot is already booked for the specified dates");
      err.errors = errors;
      err.status = 403;
      return next(err);
    }
  }

  next();
}

//
// Check if specified Booking endDate is in the past
//
const endDateNotPast = async function (req, res, next) {
  const { bookingId } = req.params

  const booking = await Booking.findByPk(bookingId);

  const endDateTime = new Date(booking.endDate).getTime();
  const nowTime = new Date().getTime();

  if (nowTime > endDateTime) {
    const err = new Error("Past bookings can't be modified");
    err.status = 403;
    err.title = "Forbidden";
    return next(err);
  }

  next();
}

//
// Validate new Spot
//
const validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
  check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required'),
  check('lat')
    .isFloat({ min: -90.0, max: 90.0 })
    .withMessage('Latitude is not valid'),
  check('lng')
    .isFloat({ min: -180.0, max: 180.0 })
    .withMessage('Longitude is not valid'),
  check('name')
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check('price')
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),
  check('price')
    .isFloat({ min: 0 })
    .withMessage("Price cannot be less than 0"),
  handleValidationErrors
];

//
// Validate new Review
//
const validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors
];

//
// Validate new Booking
//
const validateBooking = [
  check('startDate')
    .exists({ checkFalsy: true })
    .withMessage("Start Date is required"),
  check('endDate')
    .exists({ checkFalsy: true })
    .withMessage("End Date is required"),
  handleValidationErrors,
  endDateAfterStartDate,
  checkBookingConflict
]

//
// Validate new Image
//
const validateImage = [
  check('url')
    .exists({ checkFalsy: true })
    .isURL()
    .withMessage("Valid URL is required"),
  check('preview')
    .exists()
    .isBoolean()
    .withMessage("Preview boolean value is required"),
  handleValidationErrors
];

//
// Validate the search params in req.query
//
const queryParamValidator = (req, res, next) => {
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
  const errors = {};

  page = parseInt(page);
  size = parseInt(size);

  // PAGE
  if (page === 0 || (!isNaN(page) && page < 1)) {
    errors.page = "Page must be greater than or equal to 1";
  }

  // SIZE
  if (size === 0 || (!isNaN(size) && size < 1)) {
    errors.size = "Size must be greater than or equal to 1";
  }

  // LATS AND LNGS
  if (minLat) {
    if (isNaN(minLat) || minLat < -90.0 || minLat > 90) {
      errors.minLat = "Minimum latitude is invalid"
    }
  }
  if (maxLat) {
    if (isNaN(maxLat) || maxLat < -90.0 || maxLat > 90) {
      errors.maxLat = "Maximum latitude is invalid"
    }
  }
  if (minLng) {
    if (isNaN(minLng) || minLng < -180.0 || minLng > 180) {
      errors.minLng = "Minimum longitude is invalid"
    }
  }
  if (maxLng) {
    if (isNaN(maxLng) || maxLng < -180.0 || maxLng > 180) {
      errors.maxLng = "Maximum longitude is invalid"
    }
  }

  // MINPRICE
  if (minPrice) {
    if (isNaN(minPrice) || minPrice < 0) {
      errors.minPrice = "Minimum price must be greater than or equal to 0";
    }
  }

  // MAXPRICE
  if (maxPrice) {
    if (isNaN(maxPrice) || maxPrice < 0) {
      errors.maxPrice = "Maximum price must be greater than or equal to 0";
    }
  }

  if (Object.keys(errors).length) {
    const err = new Error();
    err.message = "Bad Request";
    err.errors = errors;
    res.status(400);
    return res.json(err);
  }

  return next();
}

//
// Check if user has made a review for the spot already
//
const notPrevReviewer = async (req, res, next) => {
  const user = req.user;
  const { spotId } = req.params;

  const reviews = await user.getReviews();

  for (let r of reviews) {
    if (r.spotId == spotId) {
      const err = new Error();
      err.message = "User already has a review for this spot";
      res.status(500);
      return res.json(err);
    }
  }

  next();
}


module.exports = {
  handleValidationErrors,
  validateSpot,
  validateReview,
  spotExists,
  reviewExists,
  bookingExists,
  validateBooking,
  endDateAfterStartDate,
  checkBookingConflict,
  endDateNotPast,
  validateImage,
  queryParamValidator,
  notPrevReviewer
};
