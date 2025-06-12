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
      var { action,scheme }=req.query;
      if(action === 'Delete')
      {    
        if (ssn.dashboard_roles != "BEIS Administrator") {
          res.render("bulkupload/notAuthorized");
        }
      }
    }
    else
    {
      action = "Deactivate";
    }

    if(req.query.hasOwnProperty("error"))
      reasonLengthError = req.query.error === "True";
    else
      reasonLengthError = false;

    charLimit = 1000;
    
    res.render("bulkupload/subsidymeasure-deactivate", {scheme, action, charLimit});
  }
});

module.exports = router;
