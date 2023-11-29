const { validationResult, check } = require('express-validator');
const { Spot, Review } = require('../db/models');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach(error => errors[error.path] = error.msg);

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
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
//  Check Booking endDate strictly after startDate
//
const endDateAfterStartDate = (req, res, next) => {
  let { startDate, endDate } = req.body;
  startDate = new Date(startDate);
  endDate = new Date(endDate);

  if (endDate.getTime() <= startDate.getTime()) {
    const err = new Error("Bad request");
    err.errors = {"endDate": "endDate cannot be on or before startDate"}
    err.status = 400;
    err.title = "Bad request";
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
  handleValidationErrors
];


//
// Validate new Review
//
const validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .isLength({min: 1})
    .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .isInt({min: 1, max: 5})
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
  endDateAfterStartDate
]




module.exports = {
  handleValidationErrors,
  validateSpot,
  validateReview,
  spotExists,
  reviewExists,
  validateBooking,
  endDateAfterStartDate
};
