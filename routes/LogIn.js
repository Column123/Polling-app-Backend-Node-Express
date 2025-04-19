const express = require("express");
const router = express.Router();
const authenticate = require('../controllers/authenticate')

router.route('/')
    .post(authenticate)

module.exports = router;