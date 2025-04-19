const express = require("express");
const router = express.Router();
const refreshAccessToken = require('../controllers/refreshAccessToken');
const User = require("../models/User");
const jwt = require("jsonwebtoken");
router.route('/')
    .get(refreshAccessToken);



module.exports = router;