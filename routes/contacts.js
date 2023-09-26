const express = require("express");

const router = express.Router();

const isValidId = require("../middleware/isValid");
const validErrorHandler = require("../middleware/validErrorHandler");

const {
  get,
  getById,
  create,
  deleteById,
  update,
  updateOne,
} = require("../controller");

router.get("/", get);

router.get("/:contactId", isValidId, validErrorHandler, getById);

router.post("/", create);

router.delete("/:contactId", isValidId, validErrorHandler, deleteById);

router.put("/:contactId", isValidId, validErrorHandler, update);

router.patch("/:contactId/favorite", isValidId, validErrorHandler, updateOne);

module.exports = router;
