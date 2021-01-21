const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("bulkupload/user-deactivate");
});

module.exports = router;
