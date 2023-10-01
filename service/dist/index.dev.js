"use strict";

var Contacts = require("./schemas/contacts");

function getAllContacts(_ref) {
  var page, limit, favorite;
  return regeneratorRuntime.async(function getAllContacts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          page = _ref.page, limit = _ref.limit, favorite = _ref.favorite;

          if (!favorite) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", Contacts.find({
            favorite: favorite
          }).limit(limit).skip(page * limit));

        case 3:
          return _context.abrupt("return", Contacts.find({}).limit(limit).skip(page * limit));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

function getContactById(id) {
  return regeneratorRuntime.async(function getContactById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", Contacts.findOne({
            _id: id
          }));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function createContact(_ref2) {
  var name, email, phone, favorite;
  return regeneratorRuntime.async(function createContact$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          name = _ref2.name, email = _ref2.email, phone = _ref2.phone, favorite = _ref2.favorite;
          return _context3.abrupt("return", Contacts.create({
            name: name,
            email: email,
            phone: phone,
            favorite: favorite
          }));

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function deleteContact(id) {
  return regeneratorRuntime.async(function deleteContact$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.abrupt("return", Contacts.findByIdAndRemove({
            _id: id
          }));

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function updateContact(id, value) {
  return regeneratorRuntime.async(function updateContact$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          return _context5.abrupt("return", Contacts.findByIdAndUpdate({
            _id: id
          }, value));

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function updateStatusContact(id, value) {
  return regeneratorRuntime.async(function updateStatusContact$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          return _context6.abrupt("return", Contacts.updateOne({
            _id: id
          }, {
            $set: {
              favorite: value
            }
          }));

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
}

module.exports = {
  getAllContacts: getAllContacts,
  getContactById: getContactById,
  createContact: createContact,
  deleteContact: deleteContact,
  updateContact: updateContact,
  updateStatusContact: updateStatusContact
};