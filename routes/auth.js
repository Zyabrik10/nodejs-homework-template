const express = require("express");
const router = express.Router();

const validErrorHandler = require("../middleware/validErrorHandler");
const isValidAuthSignUp = require("../middleware/isValidAuthSignUp");
const isValidAuthLogIn = require("../middleware/isValidAuthLogIn");
const isValidToken = require("../middleware/isValidToken");
const validTokenErrorHandler = require("../middleware/validTokenErrorHandler");

const validSubscription = require("../validation/subscription");

const updateAvatarMulter = require("../config/config-multer");

const validUpdateAvatar = require("../validation/updateAvatar");

const {
  signup,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
  confirmEmailUser,
  verifyEmail,
} = require("../controller/auth");

const verifyToken = require("../middleware/verifyEmailToken");
const validateEmailVerificationField = require("../validation/emailVerification");

router.post("/register", isValidAuthSignUp, validErrorHandler, signup);
router.post("/login", isValidAuthLogIn, validErrorHandler, login);

router.post(
  "/verify",
  validateEmailVerificationField,
  validErrorHandler,
  verifyEmail
);

router.post(
  "/verify/:verificationToken",
  verifyToken,
  validErrorHandler,
  confirmEmailUser
);

router.use(isValidToken, validTokenErrorHandler);

router.post("/logout", logout);
router.get("/current", getCurrentUser);
router.patch(
  "/subscription",
  validSubscription,
  validErrorHandler,
  updateSubscription
);

router.patch(
  "/avatars",
  updateAvatarMulter.single("avatar"),
  validErrorHandler,
  validUpdateAvatar,
  validErrorHandler,
  updateAvatar
);

module.exports = router;
