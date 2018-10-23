const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Research = require('../models/Research')
const passport = require('passport');
const ensureLogin = require("connect-ensure-login");
//check if logged!!

router.get('/userentries', ensureLogin.ensureLoggedIn("/error/login"), (req, res, next) => {
  let user = req.user.username;
  if (user) {
    User.findOne({ username: user })
      .then((user) => {
        const researchs = user.research;
        Research.find({ _id: { $in: researchs } })
          .then((data) => res.status(200).json(data))
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

router.post('/saveentry', (req, res, next) => {
  
  const name = req.body.researchName;
  const entry = [];
  entry.push(req.body.entry);
  Research.findOneAndUpdate({ name }, { $push: { entries: { $each: entry, $position: 0 } } })
    .then((data) => {
      res.status(200).json("Post saved!")
    })
    .catch((error) => next(error))
})

router.post('/newresearch', ensureLogin.ensureLoggedIn("/error/login"), (req, res, next) => {
  const researchName = req.body.researchName;
  const field = req.body.field
  const username = req.user.username;
  Research.findOne({ name: researchName })
    .then((data) => {
      if (data) {
        res.status(409).json("That research already exists")
        return;
      } else {
        User.findOne({ username })
          .then((user) => {
            return Research.create({
              name: researchName,
              admin: user._id,
              field,
              branch: false,
              entries: []
            })
              .then((research) => {
                const researchID = research._id;
                User.findOneAndUpdate({ username }, { $push: { research: researchID } })
                  .then(() => {
                    res.status(200).json("New research created");
                  })
              })
              .catch((error) => next(error)) //is this well placed?
          })
      }
    })
})

router.post('/branchresearch', ensureLogin.ensureLoggedIn("/error/login"), (req, res, next) => {
  const researchName = req.body.researchName;
  const field = req.body.field;
  const username = req.user.username;
  const branchedResearchName = "//" + username + "//" + researchName;
  Research.findOne({ name: branchedResearchName })
    .then((data) => {
      if (data) {
        res.status(409).json("It seems that the branch already exists");
      } else {
        User.findOne({ username })
          .then((user) => {
            return Research.create({
              name: branchedResearchName,
              admin: user._id,
              field,
              branch: true,
              entries: []
            })
              .then((research) => {
                const researchID = research._id;
                User.findOneAndUpdate({ username }, { $push: { research: researchID } })
                  .then(() => {
                    res.status(200).json("New research created");
                  })
              })
              .catch((error) => next(error)) //is this well placed?
          })
      }
    })
})


module.exports = router;