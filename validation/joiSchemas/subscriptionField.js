const Joi = require("joi");

const scheme = Joi.object({
  subscription: Joi.string()
    .required()
    .allow("starter", "pro", "business")
    .only()
    .messages({
      "any.required": "missing required subscription field",
    }),
});

module.exports = scheme;
