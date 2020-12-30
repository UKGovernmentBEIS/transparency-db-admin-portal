const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("bulkupload/subsidymeasures-edit");
});

module.exports = router;
