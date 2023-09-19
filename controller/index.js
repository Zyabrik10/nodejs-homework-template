const {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  updateStatusContact,
} = require("../service/");

const validateContactBody = require("../validation/validateContactBody");
const validateFavoriteField = require("../validation/validateFavoritefield");

async function get(_, res) {
  try {
    const contacts = await getAllContacts();
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
    const { isValid, value, message } = validateContactBody(req.body);

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
    const { isValid, value, message } = validateContactBody(req.body);

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
    const { isValid, favorite, message } = validateFavoriteField(req.body);

    if (!isValid) {
      res.status(400).json({ message });
      return;
    }

    const { contactId } = req.params;
    const contactsById = await getContactById(contactId);

    if (contactsById) {
      await updateStatusContact(contactId, favorite);
      res.status(200).json({ ...contactsById._doc, favorite });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
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
