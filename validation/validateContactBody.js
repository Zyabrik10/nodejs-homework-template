const validateContactBodyScheme = require("./joiSchemas/validateContactBody");

function validateContactBody(body) {
  try {
    if (Object.keys(body).length === 0)
      return { isValid: false, message: "missing fields", value: null };

    const { value, error } = validateContactBodyScheme.validate(body);

    if (error) {
      const message = error.details[0].message;
      return { isValid: false, message, value: null };
    }

    return { isValid: true, message: "Body is validate", value };
  } catch (e) {
    console.log(e.message);
    return { isValid: false, message: "something is wrong", value: null };
  }
}

module.exports = validateContactBody;
