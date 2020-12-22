const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("bulkupload/dashboard-gaapprover");
});

module.exports = router;
