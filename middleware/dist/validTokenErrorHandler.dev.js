"use strict";

var validTokenError = function validTokenError(error, req, res, next) {
  res.status(401).json({
    message: "Unauthorisized"
  });
};

module.exports = validTokenError;