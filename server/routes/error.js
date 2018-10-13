const express = require('express');
const router = express.Router();

router.get('/login', (req, res, next)=>{
  res.status(403).json({message: "How did you get here? You are not logged in"})
})

module.exports = router;