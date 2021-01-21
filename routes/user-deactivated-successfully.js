const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("bulkupload/user-deactivated-successfully");
});

module.exports = router;
