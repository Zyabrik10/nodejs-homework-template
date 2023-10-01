const {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  updateStatusContact,
} = require("../service");

const validContactBody = require("../validation/contactBody");

const validFavoriteField = require("../validation/favoriteField");

async function get(req, res) {
  try {
    const { page, limit, favorite } = req.query;
    const contacts = await getAllContacts({ page, limit, favorite });
    res.status(200).json(contacts);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
}

async function getById(req, res) {
  try {
    const contactsById = await getContactById(req.params.contactId);

    if (contactsById) {
      res.status(200).json(contactsById);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
}

async function create(req, res) {
  try {
    const { isValid, value, message } = validContactBody(req.body);

    if (!isValid) {
      res.status(400).json({ message });
      return;
    }

    const newContact = await createContact(value);

    if (newContact) {
      res.status(201).json(newContact);
    } else {
      res.status(400).json({ message: "Contact exists already" });
    }
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
}

async function deleteById(req, res) {
  try {
    const contactsById = await deleteContact(req.params.contactId);

    if (contactsById) {
      res.status(200).json({ message: "contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
}

async function update(req, res) {
  try {
    const { isValid, value, message } = validContactBody(req.body);

    if (!isValid) {
      res.status(400).json({ message });
      return;
    }

    const { contactId } = req.params;
    const contactsById = await getContactById(contactId);

    if (contactsById) {
      const updatedContact = await updateContact(contactId, value);
      res.status(200).json({ ...updatedContact._doc, ...value });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
}

async function updateOne(req, res) {
  try {
    const { isValid, favorite, message } = validFavoriteField(req.body);

    if (!isValid) {
      res.status(400).json({ message });
      return;
    }

    const { contactId } = req.params;
    const contactsById = await getContactById(contactId);

    await updateStatusContact(contactId, favorite);
    res.status(200).json({ ...contactsById._doc, favorite });
  } catch (e) {
    console.log(e.message);
    res.status(404).json({ message: "Not Found" });
  }
}

module.exports = {
  get,
  getById,
  create,
  deleteById,
  update,
  updateOne,
};
