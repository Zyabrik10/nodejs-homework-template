const { isValidObjectId } = require("mongoose");

const isValidId = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    if (!isValidObjectId(contactId)) {
      const errorMessage = `Id ${contactId} is not valid`;

      const error = new Error(errorMessage);
      throw error;
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isValidId;
