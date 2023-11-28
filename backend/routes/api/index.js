const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
router.use(restoreUser);

// For current user/session requests
router.use('/session', sessionRouter);

// For validating and signing up users
router.use('/users', usersRouter);

// For requests pertaining to spots
router.use('/spots', spotsRouter);


router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
