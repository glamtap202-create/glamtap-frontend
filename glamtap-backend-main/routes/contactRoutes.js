const express = require("express");
const router = express.Router();
const {
  createContact,
  getContacts,
  updateContactStatus,
  deleteContact,
} = require("../controllers/contactController");

router.post("/", createContact);
router.get("/", getContacts);
router.put("/:id", updateContactStatus);
router.delete("/:id", deleteContact);

module.exports = router;