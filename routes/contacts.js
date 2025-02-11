const express = require("express");

const router = express.Router();

const validErrorHandler = require("../middleware/validErrorHandler");

const isValidId = require("../middleware/isValidId");

const isValidToken = require("../middleware/isValidToken");
const validTokenErrorHandler = require("../middleware/validTokenErrorHandler");

const {
  get,
  getById,
  create,
  deleteById,
  update,
  updateOne,
} = require("../controller/contacts");

router.use(isValidToken, validTokenErrorHandler);

router.get("/", get);

router.get("/:contactId", isValidId, validErrorHandler, getById);

router.post("/", create);

router.delete("/:contactId", isValidId, validErrorHandler, deleteById);

router.put("/:contactId", isValidId, validErrorHandler, update);

router.patch("/:contactId/favorite", isValidId, validErrorHandler, updateOne);

module.exports = router;
