const express = require('express');
const validateRequest = require('../middlewares/validate');
const catchAsync = require("../utils/catchWrapper.utils")
const httpStatus = require("http-status");
const orgController = require("../controllers/org.controller");
const router = express.Router();
const {getOrgRole} = require("../validations/org.validaton");

router.get('/roles',validateRequest(getOrgRole),catchAsync(orgController.fetchRole))

module.exports = router