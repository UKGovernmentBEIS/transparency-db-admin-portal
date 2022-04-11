// ********************************************************************
// Gov.UK transparency subsidy scheme deactivated successfully module
// ********************************************************************

const express = require("express");
var session = require("express-session");
const router = express.Router();

const axios = require("axios");
var request = require("request");

router.get("/", async (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined"
  ) {
    res.redirect("/signout");
  } else {
    var schemeStatus = "Inactive";
    var render = "bulkupload/subsidymeasure-deactivated-successfully";
    if (req.baseUrl.includes("/successfullydeletescheme")) {
      if (ssn.dashboard_roles != "BEIS Administrator"){
        res.render("bulkupload/notAuthorized");
      }else{
        schemeStatus = "Deleted";
        render = "bulkupload/subsidymeasure-deleted-successfully"
      }
    }
    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

    try {
      console.log("scNumber_Global", scNumber_Global);
      const deleteUser = await axios.put(
        beis_url_searchscheme + `/scheme/update/${scNumber_Global}`,
        {
          status: schemeStatus,
        },
        ssn.UserPrincileObjectGlobal
      );

      console.log(`Status: ${deleteUser.status}`);

      if (schemeStatus == "Deleted"){
        const deleteAwards = await axios.put(
          beis_url_publishing + `/award/deletescheme/${scNumber_Global}`, {}, ssn.UserPrincileObjectGlobal
        );
      }

      res.render(render, {
        scNumber_Global,
      });
    } catch (err) {
      console.log("message error : " + err);
      if (err.toString().includes("500")) res.render("bulkupload/notAvailable");
      else if (err.toString().includes("401"))
        res.render("bulkupload/notAuthorized");
    }
  }
});

module.exports = router;
