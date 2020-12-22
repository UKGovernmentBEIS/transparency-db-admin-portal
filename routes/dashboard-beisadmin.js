const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.render("bulkupload/dashboard-beisadmin");
});

module.exports = router;
