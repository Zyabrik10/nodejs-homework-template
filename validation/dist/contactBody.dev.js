"use strict";

var joiSchemeContactBody = require("./joiSchemas/contactBody");

function validateContactBody(body) {
  try {
    if (Object.keys(body).length === 0) return {
      isValid: false,
      message: "missing fields",
      value: null
    };

    var _joiSchemeContactBody = joiSchemeContactBody.validate(body),
        value = _joiSchemeContactBody.value,
        error = _joiSchemeContactBody.error;

    if (error) {
      var message = error.details[0].message;
      return {
        isValid: false,
        message: message,
        value: null
      };
    }

    return {
      isValid: true,
      message: "Body is validate",
      value: value
    };
  } catch (e) {
    console.log(e.message);
    return {
      isValid: false,
      message: "something is wrong",
      value: null
    };
  }
}

module.exports = validateContactBody;