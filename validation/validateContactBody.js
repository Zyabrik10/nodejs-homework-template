const validateContactBodyScheme = require("./joiSchemas/validateContactBody");

function validateContactBody(body) {
  try {
    if (Object.keys(body).length === 0)
      return { isValidate: false, message: "missing fields", value: null };

    const { value, error } = validateContactBodyScheme.validate(body);

    if (error) {
      const message = error.details[0].message;
      return { isValidate: false, message, value: null };
    }

    return { isValidate: true, message: "Body is validate", value };
  } catch (e) {
    console.log(e.message);
    return { isValidate: false, message: "something is wrong", value: null };
  }
}

module.exports = validateContactBody;
