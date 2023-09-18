const express = require("express");

const router = express.Router();

const { get, getById, create, deleteById, update } = require("../controller");

router.get("/", get);

router.get("/:contactId", getById);

router.post("/", create);

router.delete("/:contactId", deleteById);

router.put("/:contactId", update);

module.exports = router;
