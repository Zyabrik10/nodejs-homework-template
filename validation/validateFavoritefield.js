const validateFavoriteFieldScheme = require("./joiSchemas/validateFavoriteField");

function validateFavoriteField(body) {
  try {
    if (Object.keys(body).length === 0)
      return { isValid: false, message: "missing field", value: null };

    const { value, error } = validateFavoriteFieldScheme.validate(body);

    if (error) {
      const message = error.details[0].message;
      return { isValid: false, message, favorite: null };
    }

    return {
      isValid: true,
      message: "Body is validate",
      favorite: value.favorite,
    };
  } catch (e) {
    console.log(e.message);
    return { isValid: false, message: "Something is wrong", favorite: null };
  }
}

module.exports = validateFavoriteField;
