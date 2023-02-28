// ********************************************************************
// Gov.UK transparency admin program view screen
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
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

    var id = "";
    noresult = false;

    if(req.query.hasOwnProperty("id")){
        id = req.query.id;
    }

    var endpoint = beis_url_searchscheme + "/adminprogram/" + id;

    try {
      const apiData = await axios.get(
        endpoint,
        ssn.UserPrincileObjectGlobal
      );

      ssn.adminProgramDetails = apiData.data;

      res.render("admin-program/adminprogram");

    } catch (err) {
      const status = err.response.status;
      console.error("ERROR: " + err.message);

      switch(status){
        case 500:
          res.render("bulkupload/notAvailable");
          break;
        case 404:
          noresult = true;
          nodata = "No admin program available";
          res.render("admin-program/adminprogram", {
            noresult,
            nodata,
          });
        break;
        case 401:
        case 403:
          res.render("bulkupload/notAuthorized");
          break;
      }
    }
  }
});

module.exports = router;
