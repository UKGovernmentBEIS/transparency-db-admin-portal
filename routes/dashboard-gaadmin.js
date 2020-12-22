const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("bulkupload/dashboard-gaadmin");
});

module.exports = router;
