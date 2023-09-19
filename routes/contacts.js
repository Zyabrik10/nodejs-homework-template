const express = require("express");

const router = express.Router();

const {
  get,
  getById,
  create,
  deleteById,
  update,
  updateOne,
} = require("../controller");

router.get("/", get);

router.get("/:contactId", getById);

router.post("/", create);

router.delete("/:contactId", deleteById);

router.put("/:contactId", update);

router.patch("/:contactId/favorite", updateOne);

module.exports = router;
