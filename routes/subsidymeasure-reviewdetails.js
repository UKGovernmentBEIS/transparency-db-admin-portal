const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("bulkupload/subsidymeasure-reviewdetails");
});

module.exports = router;