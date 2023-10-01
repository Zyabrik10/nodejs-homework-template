const { isValidObjectId } = require("mongoose");
const { createStatusError } = require("../help/createStatusError");

const isValidId = async (req, _, next) => {
  try {
    const { contactId } = req.params;

    if (!isValidObjectId(contactId))
      throw createStatusError(404, `Id ${contactId} is not valid`);

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isValidId;
