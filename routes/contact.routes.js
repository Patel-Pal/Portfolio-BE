const router = require("express").Router();
const { submitContact } = require("../controllers/contact.controller");

router.post("/submit", submitContact);

module.exports = router;
