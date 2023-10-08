"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require("../service"),
    getAllContacts = _require.getAllContacts,
    getContactById = _require.getContactById,
    createContact = _require.createContact,
    updateContact = _require.updateContact,
    deleteContact = _require.deleteContact,
    updateStatusContact = _require.updateStatusContact;

var validContactBody = require("../validation/contactBody");

var validFavoriteField = require("../validation/favoriteField");

function get(req, res) {
  var _req$query, page, limit, favorite, contacts;

  return regeneratorRuntime.async(function get$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$query = req.query, page = _req$query.page, limit = _req$query.limit, favorite = _req$query.favorite;
          _context.next = 4;
          return regeneratorRuntime.awrap(getAllContacts(req.user._id, {
            page: page - 1,
            limit: limit,
            favorite: favorite
          }));

        case 4:
          contacts = _context.sent;
          res.status(200).json(contacts);
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          res.status(400).json({
            message: _context.t0.message
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
}

function getById(req, res) {
  var contactsById;
  return regeneratorRuntime.async(function getById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(getContactById(req.user._id, req.params.contactId));

        case 3:
          contactsById = _context2.sent;

          if (contactsById) {
            res.status(200).json(contactsById);
          } else {
            res.status(404).json({
              message: "Not found"
            });
          }

          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0.message);
          res.status(400).json({
            message: _context2.t0.message
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

function create(req, res) {
  var _validContactBody, isValid, value, message, newContact;

  return regeneratorRuntime.async(function create$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _validContactBody = validContactBody(req.body), isValid = _validContactBody.isValid, value = _validContactBody.value, message = _validContactBody.message;

          if (isValid) {
            _context3.next = 5;
            break;
          }

          res.status(400).json({
            message: message
          });
          return _context3.abrupt("return");

        case 5:
          _context3.next = 7;
          return regeneratorRuntime.awrap(createContact(req.user._id, value));

        case 7:
          newContact = _context3.sent;

          if (newContact) {
            res.status(201).json(newContact);
          } else {
            res.status(400).json({
              message: "Contact exists already"
            });
          }

          _context3.next = 15;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0.message);
          res.status(400).json({
            message: _context3.t0.message
          });

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function deleteById(req, res) {
  var contactsById;
  return regeneratorRuntime.async(function deleteById$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(deleteContact(req.params.contactId));

        case 3:
          contactsById = _context4.sent;

          if (contactsById) {
            res.status(200).json({
              message: "contact deleted"
            });
          } else {
            res.status(404).json({
              message: "Not found"
            });
          }

          _context4.next = 11;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0.message);
          res.status(400).json({
            message: _context4.t0.message
          });

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

function update(req, res) {
  var _validContactBody2, isValid, value, message, contactId, contactsById, updatedContact;

  return regeneratorRuntime.async(function update$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _validContactBody2 = validContactBody(req.body), isValid = _validContactBody2.isValid, value = _validContactBody2.value, message = _validContactBody2.message;

          if (isValid) {
            _context5.next = 5;
            break;
          }

          res.status(400).json({
            message: message
          });
          return _context5.abrupt("return");

        case 5:
          contactId = req.params.contactId;
          _context5.next = 8;
          return regeneratorRuntime.awrap(getContactById(req.user._id, contactId));

        case 8:
          contactsById = _context5.sent;

          if (!contactsById) {
            _context5.next = 16;
            break;
          }

          _context5.next = 12;
          return regeneratorRuntime.awrap(updateContact(contactId, value));

        case 12:
          updatedContact = _context5.sent;
          res.status(200).json(_objectSpread({
            _id: updatedContact._id,
            owner: updatedContact.owner
          }, value));
          _context5.next = 17;
          break;

        case 16:
          res.status(404).json({
            message: "Not found"
          });

        case 17:
          _context5.next = 23;
          break;

        case 19:
          _context5.prev = 19;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0.message);
          res.status(400).json({
            message: _context5.t0.message
          });

        case 23:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 19]]);
}

function updateOne(req, res) {
  var _validFavoriteField, isValid, favorite, message, contactId, contactById, _ref, email, name, phone, _id, owner;

  return regeneratorRuntime.async(function updateOne$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _validFavoriteField = validFavoriteField(req.body), isValid = _validFavoriteField.isValid, favorite = _validFavoriteField.favorite, message = _validFavoriteField.message;

          if (isValid) {
            _context6.next = 5;
            break;
          }

          res.status(400).json({
            message: message
          });
          return _context6.abrupt("return");

        case 5:
          contactId = req.params.contactId;
          _context6.next = 8;
          return regeneratorRuntime.awrap(getContactById(req.user._id, contactId));

        case 8:
          contactById = _context6.sent;

          if (!contactById) {
            _context6.next = 21;
            break;
          }

          _context6.next = 12;
          return regeneratorRuntime.awrap(updateStatusContact(contactId, favorite));

        case 12:
          _ref = _context6.sent;
          email = _ref.email;
          name = _ref.name;
          phone = _ref.phone;
          _id = _ref._id;
          owner = _ref.owner;
          res.status(200).json({
            _id: _id,
            owner: owner,
            email: email,
            name: name,
            phone: phone,
            favorite: favorite
          });
          _context6.next = 22;
          break;

        case 21:
          res.status(400).json({
            message: "Such contact doesn't exist"
          });

        case 22:
          _context6.next = 28;
          break;

        case 24:
          _context6.prev = 24;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0.message);
          res.status(404).json({
            message: "Not Found"
          });

        case 28:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 24]]);
}

module.exports = {
  get: get,
  getById: getById,
  create: create,
  deleteById: deleteById,
  update: update,
  updateOne: updateOne
};