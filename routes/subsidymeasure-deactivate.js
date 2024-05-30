// ********************************************************************
// Gov.UK transparency subsidy scheme deactivate module
// ********************************************************************

const express = require("express");
var session = require("express-session");
const router = express.Router();

router.get("/", async (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined"
  ) {
    res.redirect("/signout");
  } else {
    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    if(req.query.hasOwnProperty("action"))
    {
      action = req.query.action;
    }
    else
    {
      action = "Deactivate";
    }

    if (ssn.dashboard_roles != "BEIS Administrator") {
      res.render("bulkupload/notAuthorized");
    }
    charLimit = 1000;
    
    res.render("bulkupload/subsidymeasure-deactivate", {action, charLimit});
  }
});


router.post("/", (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined"
  ) {
    res.redirect("/signout");
  } else {
    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    reason = req.body.reason;
    action = req.body.action;
    res.render("bulkupload/subsidymeasure-deactivated-successfully",{action});
  }
});
module.exports = router;
