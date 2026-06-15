// ********************************************************************
// Gov.UK transparency Subsidy collect checkbox module
// ********************************************************************

const express = require("express");
var session = require("express-session");
const router = express.Router();
const utils = require("../utils");

router.get("/", (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined"
  ) {
    res.redirect("/signout");
  } else {
    const { Subsidy_awardNo } = req.body;

    let person = {
      subsidy: req.body.Subsidy_awardNo,
    };

    console.log(Subsidy_awardNo);

    utils.setSecurityHeaders(res, beis_url_accessmanagement);

    res.render("bulkupload/mysubsidyawards");
  }
});

module.exports = router;
