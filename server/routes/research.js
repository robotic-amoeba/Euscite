const express = require('express');
const router  = express.Router();
const User = require('../models/User');
const passport = require('passport');



router.post('/userentries', (req, res, next) => {
  console.log(req.body)
  User.find()
      .then(data => res.status(200).json(data))
      .catch(e => next(e))
})

module.exports = router;