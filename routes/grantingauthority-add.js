// ********************************************************************
// Gov.UK transparency Subsidy granting authority add module
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
    utils.setSecurityHeaders(res, beis_url_accessmanagement);
    console.log("totalrecords", req.query);
    // req.query = JSON.parse(JSON.stringify(req.query));

    if (req.query.hasOwnProperty("change")) {
      console.log(
        "ssn.grantingAuthorityName_Global",
        ssn.grantingAuthorityName_Global
      );

      if (ssn.dashboard_roles == "BEIS Administrator") {
        res.render("bulkupload/grantingauthority-add", {
          // ssn.grantingAuthorityName_Global,
          ssn,
        });
      } else {
        res.render("bulkupload/notAuthorized");
      }
    } else {
      ssn.grantingAuthorityName_Error = "";
      ssn.grantingAuthorityName_Global = "";
      if (ssn.dashboard_roles == "BEIS Administrator") {
        res.render("bulkupload/grantingauthority-add");
      } else {
        res.render("bulkupload/notAuthorized");
      }
    }
  }
});

// router.post("/", (req, res) => {
//   ssn.grantingAuthorityName_Error = false;
//   ssn.grantingAuthorityID_Global = req.body.gaNumber;
//   if (!req.body.grantingAuthorityName) ssn.grantingAuthorityName_Error = true;

//   if (ssn.grantingAuthorityName_Error) {
//     res.render("bulkupload/grantingauthority-add", {
//       ssn.grantingAuthorityName_Error,
//       ssn.grantingAuthorityID_Global,
//     });
//   } else {
//     ssn.grantingAuthorityID_Global = req.body.gaNumber;
//     ssn.grantingAuthorityName_Global = req.body.grantingAuthorityName;

//     res.render("bulkupload/grantingauthority-reviewdetails", {
//       ssn.grantingAuthorityID_Global,
//       ssn.grantingAuthorityName_Global,
//     });
//   }
// });

module.exports = router;
