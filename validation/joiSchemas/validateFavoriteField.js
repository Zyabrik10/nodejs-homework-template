const Joi = require("joi");

const scheme = Joi.object({
  favorite: Joi.bool().required().messages({
    "any.required": "missing required favorite field",
  }),
});

module.exports = scheme;
