const express = require('express');
const validateRequest = require('../middlewares/validate');
const { login } = require('../validations/auth.validation');
const authController = require("../controllers/auth.controller");
const catchAsync = require('../utils/catchWrapper.utils');


const router = express.Router();
// considered the case of login with email
router.post('/login/:organisation/',validateRequest(login),catchAsync(authController.login))

module.exports = router