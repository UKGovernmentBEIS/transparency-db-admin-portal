// ********************************************************************
// Gov.UK transparency admin program deleted successfully module
// ********************************************************************

const express = require("express");
var session = require("express-session");
const router = express.Router();

const axios = require("axios");
var request = require("request");
const utils = require("../utils");

router.get("/", async (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined"
  ) {
    res.redirect("/signout");
  } else {
    var status = "Deleted";
    var render = "admin-program/adminprogramdeletesuccess";

    utils.setSecurityHeaders(res, beis_url_searchscheme);

    try {
      console.log("Admin Program Number", ssn.adminProgramDetails.apNumber);
      const deleteApiData = await axios.put(
        beis_url_searchscheme + `/adminprogram/update/${ssn.adminProgramDetails.apNumber}`,
        {
          status: status,
        },
        ssn.UserPrincileObjectGlobal
      );

      console.log(`Status: ${deleteApiData.status}`);

      res.render(render, {
        ssn,
      });
    } catch (err) {
      const status = err.response.status;
      console.log("message error : " + err);

      var render = "bulkupload/notAvailable";
      switch(status){
        case 500:
          break;
        case 401:
        case 403:
          render = "bulkupload/notAuthorized"
          break;
      }
      res.render(render);
    }
  }
});

module.exports = router;
