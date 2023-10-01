"use strict";

var subscriptionScheme = require("./joiSchemas/subscriptionField");

var _require = require("../help/createStatusError"),
    createStatusError = _require.createStatusError;

var validSubscription = function validSubscription(req, res, next) {
  try {
    var _subscriptionScheme$v = subscriptionScheme.validate(req.body),
        error = _subscriptionScheme$v.error;

    if (error) {
      throw createStatusError(400, error.message);
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validSubscription;