const express = require("express");
const router = express.Router();
const deleteRefreshToken = require('../controllers/deleteRefreshToken');

router.route('/')
    .get(deleteRefreshToken);

module.exports = router;