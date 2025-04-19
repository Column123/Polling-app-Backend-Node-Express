const express = require("express");
const router = express.Router();
const createAccount = require("../controllers/createAccount");


router.route('/')
    .post(createAccount);

module.exports = router;