const Joi = require("joi");

const scheme = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing required name field",
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "any.required": "missing required email field",
    }),
  phone: Joi.string().required().messages({
    "any.required": "missing required phone field",
  }),
  favorite: Joi.bool().required().messages({
    "any.required": "missing required favorite field",
  }),
});

module.exports = scheme;
