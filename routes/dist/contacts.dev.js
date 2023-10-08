"use strict";

var express = require("express");

var router = express.Router();

var validErrorHandler = require("../middleware/validErrorHandler");

var isValidId = require("../middleware/isValidId");

var isValidToken = require("../middleware/isValidToken");

var validTokenErrorHandler = require("../middleware/validTokenErrorHandler");

var _require = require("../controller/contacts"),
    get = _require.get,
    getById = _require.getById,
    create = _require.create,
    deleteById = _require.deleteById,
    update = _require.update,
    updateOne = _require.updateOne;

router.use(isValidToken, validTokenErrorHandler);
router.get("/", get);
router.get("/:contactId", isValidId, validErrorHandler, getById);
router.post("/", create);
router["delete"]("/:contactId", isValidId, validErrorHandler, deleteById);
router.put("/:contactId", isValidId, validErrorHandler, update);
router.patch("/:contactId/favorite", isValidId, validErrorHandler, updateOne);
module.exports = router;