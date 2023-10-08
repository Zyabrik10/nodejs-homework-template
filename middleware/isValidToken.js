const jwt = require("jsonwebtoken");
const User = require("../service/schemas/user");

const isValidToken = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer") &&
      req.headers.authorization.split("Bearer").join("").trim();
    const verify = jwt.verify(token, process.env.SECRET);

    const { _id } = verify;

    const user = await User.findOne({ _id });

    if (!user || token !== user.token) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isValidToken;
