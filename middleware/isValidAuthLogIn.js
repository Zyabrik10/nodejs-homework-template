const { createStatusError } = require("../help/createStatusError");
const validAuth = require("../validation/joiSchemas/auth");

const isValidAuthLogIn = async (req, _, next) => {
  try {
    const { error } = validAuth.validate(req.body);

    if (error) throw createStatusError(400, error);

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isValidAuthLogIn;
