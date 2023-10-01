"use strict";

var jwt = require("jsonwebtoken");

var User = require("../service/schemas/user");

var signup = function signup(req, res) {
  var _req$body, email, password, newUser, token;

  return regeneratorRuntime.async(function signup$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          newUser = new User({
            email: email
          });
          token = jwt.sign({
            _id: newUser._id
          }, process.env.SECRET, {
            expiresIn: "1h"
          });
          newUser.setPassword(password);
          newUser.token = token;
          _context.next = 7;
          return regeneratorRuntime.awrap(newUser.save());

        case 7:
          res.status(201).json({
            user: {
              email: email,
              subscription: newUser.subscription
            }
          });

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
};

var login = function login(req, res) {
  var _req$body2, bodyPassword, bodyEmail, user, email, _id, subscription, token;

  return regeneratorRuntime.async(function login$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, bodyPassword = _req$body2.password, bodyEmail = _req$body2.email;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            email: bodyEmail
          }));

        case 3:
          user = _context2.sent;

          if (!(!user || !user.validPassword(bodyPassword))) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "Incorrect login or password"
          }));

        case 6:
          email = user.email, _id = user._id, subscription = user.subscription;
          token = jwt.sign({
            _id: _id
          }, process.env.SECRET, {
            expiresIn: "1h"
          });
          _context2.next = 10;
          return regeneratorRuntime.awrap(User.findOneAndUpdate({
            _id: _id
          }, {
            token: token
          }));

        case 10:
          res.status(200).json({
            token: token,
            user: {
              email: email,
              subscription: subscription
            }
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var logout = function logout(req, res) {
  return regeneratorRuntime.async(function logout$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(User.findOneAndUpdate({
            _id: req.user._id
          }, {
            token: ""
          }));

        case 2:
          res.status(204).json();

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var getCurrentUser = function getCurrentUser(req, res) {
  var _ref, email, subscription;

  return regeneratorRuntime.async(function getCurrentUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(User.findOne({
            _id: req.user._id
          }));

        case 2:
          _ref = _context4.sent;
          email = _ref.email;
          subscription = _ref.subscription;
          res.json({
            email: email,
            subscription: subscription
          });

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var updateSubscription = function updateSubscription(req, res) {
  var subscription, _ref2, email;

  return regeneratorRuntime.async(function updateSubscription$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          subscription = req.body.subscription;
          _context5.next = 3;
          return regeneratorRuntime.awrap(User.findOneAndUpdate({
            _id: req.user._id
          }, {
            subscription: req.body.subscription
          }));

        case 3:
          _ref2 = _context5.sent;
          email = _ref2.email;
          res.status(201).json({
            email: email,
            subscription: subscription
          });

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
};

module.exports = {
  signup: signup,
  login: login,
  logout: logout,
  getCurrentUser: getCurrentUser,
  updateSubscription: updateSubscription
};