"use strict";

var express = require("express");

var router = express.Router();

var validErrorHandler = require("../middleware/validErrorHandler");

var isValidAuthSignUp = require("../middleware/isValidAuthSignUp");

var isValidAuthLogIn = require("../middleware/isValidAuthLogIn");

var isValidToken = require("../middleware/isValidToken");

var validTokenErrorHandler = require("../middleware/validTokenErrorHandler");

var validSubscription = require("../validation/subscription");

var _require = require("../controller/auth"),
    signup = _require.signup,
    login = _require.login,
    logout = _require.logout,
    getCurrentUser = _require.getCurrentUser,
    updateSubscription = _require.updateSubscription;

router.post("/register", isValidAuthSignUp, validErrorHandler, signup);
router.post("/login", isValidAuthLogIn, validErrorHandler, login);
router.use(isValidToken, validTokenErrorHandler);
router.post("/logout", logout);
router.get("/current", getCurrentUser);
router.patch("/subscription", validSubscription, validErrorHandler, updateSubscription);
module.exports = router;