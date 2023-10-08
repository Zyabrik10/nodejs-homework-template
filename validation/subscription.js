const subscriptionScheme = require("./joiSchemas/subscriptionField");
const { createStatusError } = require("../help/createStatusError");

const validSubscription = (req, res, next) => {
  try {
    const { error } = subscriptionScheme.validate(req.body);

    if (error) {
      throw createStatusError(400, error.message);
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validSubscription;
