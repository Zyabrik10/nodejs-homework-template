const Contacts = require("./schemas/contacts");

async function getAllContacts(userId, { page, limit, favorite }) {
  if (page < 0) page = 1;

  if (favorite)
    return Contacts.find({ owner: userId, favorite: favorite })
      .limit(limit)
      .skip(page * limit);
  return Contacts.find({ owner: userId })
    .limit(limit)
    .skip(page * limit);
}

async function getContactById(contactId) {
  return Contacts.findOne({ _id: contactId });
}

async function createContact(userId, { email, name, phone }) {
  return Contacts.create({ email, name, phone, owner: userId });
}

async function deleteContact(contactId) {
  return Contacts.findOneAndRemove({ _id: contactId });
}

async function updateContact(contactId, { email, name, phone }) {
  return Contacts.findOneAndUpdate({ _id: contactId }, { email, name, phone });
}

async function updateStatusContact(contactId, value) {
  return Contacts.findOneAndUpdate({ _id: contactId }, { favorite: value });
}

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};
