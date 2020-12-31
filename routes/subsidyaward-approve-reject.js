const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("bulkupload/subsidyaward-approve-reject");
});

module.exports = router;
