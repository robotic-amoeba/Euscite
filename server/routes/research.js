const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Research = require('../models/Research')
const passport = require('passport');
const ensureLogin = require("connect-ensure-login");
//check if logged!!

router.get('/userentries', ensureLogin.ensureLoggedIn("/error/login"), (req, res, next) => {
  let user = req.user.username;
  if(user){
    User.findOne({username: user})
      .then((user) => {
        const researchs = user.research;
        Research.find({_id: {$in: researchs}})
        .then((data)=>res.status(200).json(data))
      })
      .catch(e => next(e))
  } else {
    res.status(403)
  }
})

router.get('/randomposts', (req, res, next) => {
  Research.find()
    .then((data) => res.status(200).json(data))
    .catch(e => next(e))
})

router.post('/saveentry', (req, res, next)=>{
  console.log(req.body)
  const name = req.body.researchName
  Research.findOne({name})
  .then((data)=>{
    console.log(data)
    res.status(200).json(data)
  })
})


module.exports = router;