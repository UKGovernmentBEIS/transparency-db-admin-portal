const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("bulkupload/grantingauthority-reviewdetails");
});

module.exports = router;
