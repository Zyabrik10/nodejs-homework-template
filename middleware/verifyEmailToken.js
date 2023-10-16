const jwt = require("jsonwebtoken");
const { createStatusError } = require("../help/createStatusError");
const User = require("../service/schemas/user");

async function verifyToken(req, res, next) {
  try {
    const token =
      req.params.verificationToken && req.params.verificationToken.trim();

    const verify = jwt.verify(token, process.env.SECRET);

    const { _id } = verify;

    const user = await User.findOne({ _id });
    user.password = null;

    if (!user || token !== user.verificationToken) {
      throw createStatusError(404, "Not Found");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = verifyToken;
