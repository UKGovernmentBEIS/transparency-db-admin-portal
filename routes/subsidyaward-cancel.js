const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("bulkupload/subsidyaward-cancel");
});

module.exports = router;
