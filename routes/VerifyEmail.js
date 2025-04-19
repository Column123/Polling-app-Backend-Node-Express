const express = require("express");
const router = express.Router();
const verification = require('../controllers/verification');

router.route('/:token')
    .get(verification)

module.exports = router;