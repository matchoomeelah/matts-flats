const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User, Spot, Review } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
  // Create the token.
  const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName
  };
  const token = jwt.sign(
    { data: safeUser },
    secret,
    { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
  );

  const isProduction = process.env.NODE_ENV === "production";

  // Set the token cookie
  res.cookie('token', token, {
    maxAge: expiresIn * 1000, // maxAge in milliseconds
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax"
  });

  return token;
};



// Global middleware to set the current req.user
const restoreUser = (req, res, next) => {
  // token parsed from cookies
  const { token } = req.cookies;
  req.user = null;

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      return next();
    }

    try {
      const { id } = jwtPayload.data;
      req.user = await User.findByPk(id, {
        attributes: {
          include: ['email', 'firstName', 'lastName', 'createdAt', 'updatedAt']
        }
      });
    } catch (e) {
      res.clearCookie('token');
      return next();
    }

    if (!req.user) res.clearCookie('token');

    return next();
  });
};


// If there is no current user, return an error
const requireAuth = function (req, _res, next) {
  if (req.user) return next();

  const err = new Error('Authentication required');
  err.title = 'Authentication required';
  err.errors = { message: 'Authentication required' };
  err.status = 401;
  return next(err);
}


// Require the current user to be the spot owner
const requireSpotOwner = async function (req, res, next) {
  if (!req.user) {
    return requireAuth(req, res, next);
  }


  // Find spotIds owned by user
  const spots = await Spot.findAll({
    attributes: ["id"],
    where: {
      ownerId: req.user.id
    }
  });


  if (spots.some(spot => spot.id == req.params.spotId)) {
    return next();
  }

  const err = new Error('Forbidden');
  err.title = 'Authorization required';
  err.errors = { message: 'Forbidden' };
  err.status = 403;
  return next(err);
}


// Require the current user to be the review owner
const requireReviewOwner = async function (req, res, next) {
  if (!req.user) {
    return requireAuth(req, res, next);
  }


  // Find reviewIds owned by user
  const reviews = await Review.findAll({
    attributes: ["id"],
    where: {
      userId: req.user.id
    }
  });


  if (reviews.some(review => review.id == req.params.reviewId)) {
    return next();
  }

  const err = new Error('Forbidden');
  err.title = 'Authorization required';
  err.errors = { message: 'Forbidden' };
  err.status = 403;
  return next(err);
}



module.exports = { setTokenCookie, restoreUser, requireAuth, requireSpotOwner, requireReviewOwner };
