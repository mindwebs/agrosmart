  
const express = require('express');
const router = express.Router();

//const Url = require('../models/Url');

// @route     GET /:code
// @desc      Redirect to long/original URL
router.get('/', async (req, res) => {
  try {
    const outP = "AgroSmart Backend Running Sucessfully!";
    res.status(200).json(outP);
    // res.sendFile(path.join('../html/index.html'));
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
});

module.exports = router;