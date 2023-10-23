const { createStatusError } = require("../help/createStatusError");
const validateEmailVerificationFieldScheme = require("./joiSchemas/emailVarfication");

function validateEmailVerificationField(req, res, next) {
  try {
    const { error } = validateEmailVerificationFieldScheme.validate(req.body);

    if (error) throw createStatusError(400, error.details[0].message);

    next();
  } catch (e) {
    next(e);
  }
}

module.exports = validateEmailVerificationField;
