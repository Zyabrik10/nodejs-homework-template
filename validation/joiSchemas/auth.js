const Joi = require("joi");

const scheme = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "any.required": "missing required email field",
    }),
  password: Joi.string().min(4).alphanum().required().messages({
    "any.required": "missing required password field",
  }),
});

module.exports = scheme;
