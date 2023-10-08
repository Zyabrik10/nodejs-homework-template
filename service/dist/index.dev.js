"use strict";

var Contacts = require("./schemas/contacts");

function getAllContacts(userId, _ref) {
  var page, limit, favorite;
  return regeneratorRuntime.async(function getAllContacts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          page = _ref.page, limit = _ref.limit, favorite = _ref.favorite;
          if (page < 0) page = 1;

          if (!favorite) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", Contacts.find({
            owner: userId,
            favorite: favorite
          }).limit(limit).skip(page * limit));

        case 4:
          return _context.abrupt("return", Contacts.find({
            owner: userId
          }).limit(limit).skip(page * limit));

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

function getContactById(contactId) {
  return regeneratorRuntime.async(function getContactById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", Contacts.findOne({
            _id: contactId
          }));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function createContact(userId, _ref2) {
  var email, name, phone;
  return regeneratorRuntime.async(function createContact$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          email = _ref2.email, name = _ref2.name, phone = _ref2.phone;
          return _context3.abrupt("return", Contacts.create({
            email: email,
            name: name,
            phone: phone,
            owner: userId
          }));

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function deleteContact(contactId) {
  return regeneratorRuntime.async(function deleteContact$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.abrupt("return", Contacts.findOneAndRemove({
            _id: contactId
          }));

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function updateContact(contactId, _ref3) {
  var email, name, phone;
  return regeneratorRuntime.async(function updateContact$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          email = _ref3.email, name = _ref3.name, phone = _ref3.phone;
          return _context5.abrupt("return", Contacts.findOneAndUpdate({
            _id: contactId
          }, {
            email: email,
            name: name,
            phone: phone
          }));

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function updateStatusContact(contactId, value) {
  return regeneratorRuntime.async(function updateStatusContact$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          return _context6.abrupt("return", Contacts.findOneAndUpdate({
            _id: contactId
          }, {
            favorite: value
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