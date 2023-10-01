"use strict";

var jwt = require("jsonwebtoken");

var User = require("../service/schemas/user");

var isValidToken = function isValidToken(req, res, next) {
  var token, verify, _id, user;

  return regeneratorRuntime.async(function isValidToken$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          token = req.headers.authorization && req.headers.authorization.startsWith("Bearer") && req.headers.authorization.split("Bearer").join("").trim();
          verify = jwt.verify(token, process.env.SECRET);
          _id = verify._id;
          _context.next = 6;
          return regeneratorRuntime.awrap(User.findOne({
            _id: _id
          }));

        case 6:
          user = _context.sent;

          if (!(!user || token !== user.token)) {
            _context.next = 9;
            break;
          }

          throw new Error("Unauthorisized");

        case 9:
          req.user = user;
          next();
          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

module.exports = isValidToken;