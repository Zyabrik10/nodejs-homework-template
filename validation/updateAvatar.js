const { createStatusError } = require("../help/createStatusError");

module.exports = (req, res, next) => {
  try {
    if (req.file === undefined)
      throw createStatusError(400, "File is not provided");

    next();
  } catch (error) {
    next(error);
  }
};
