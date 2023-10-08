const express = require("express");
const router = express.Router();

const validErrorHandler = require("../middleware/validErrorHandler");
const isValidAuthSignUp = require("../middleware/isValidAuthSignUp");
const isValidAuthLogIn = require("../middleware/isValidAuthLogIn");
const isValidToken = require("../middleware/isValidToken");
const validTokenErrorHandler = require("../middleware/validTokenErrorHandler");

const validSubscription = require("../validation/subscription");

const {
  signup,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
} = require("../controller/auth");

router.post("/register", isValidAuthSignUp, validErrorHandler, signup);
router.post("/login", isValidAuthLogIn, validErrorHandler, login);

router.use(isValidToken, validTokenErrorHandler);

router.post("/logout", logout);
router.get("/current", getCurrentUser);
router.patch(
  "/subscription",
  validSubscription,
  validErrorHandler,
  updateSubscription
);

module.exports = router;
