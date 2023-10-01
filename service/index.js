const Contacts = require("./schemas/contacts");

async function getAllContacts({ page, limit, favorite }) {
  if (favorite)
    return Contacts.find({ favorite: favorite })
      .limit(limit)
      .skip(page * limit);
  return Contacts.find({})
    .limit(limit)
    .skip(page * limit);
}

async function getContactById(id) {
  return Contacts.findOne({ _id: id });
}

async function createContact({ name, email, phone, favorite }) {
  return Contacts.create({ name, email, phone, favorite });
}

async function deleteContact(id) {
  return Contacts.findByIdAndRemove({ _id: id });
}

async function updateContact(id, value) {
  return Contacts.findByIdAndUpdate({ _id: id }, value);
}

async function updateStatusContact(id, value) {
  return Contacts.updateOne({ _id: id }, { $set: { favorite: value } });
}

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};
