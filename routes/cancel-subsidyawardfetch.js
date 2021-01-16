const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("bulkupload/cancel-subsidyawardfetch");
});

module.exports = router;
