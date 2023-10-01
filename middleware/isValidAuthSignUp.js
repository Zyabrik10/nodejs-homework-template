const { createStatusError } = require("../help/createStatusError");
const User = require("../service/schemas/user");
const validAuth = require("../validation/joiSchemas/auth");

const isValidAuthSignUp = async (req, _, next) => {
  try {
    const { value, error } = validAuth.validate(req.body);

    if (error) throw createStatusError(400, error);

    const { email } = value;

    const isUserExist = await User.findOne({
      email: {
        $eq: email,
      },
    });

    if (isUserExist) throw createStatusError(409, "Email in use");

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isValidAuthSignUp;
