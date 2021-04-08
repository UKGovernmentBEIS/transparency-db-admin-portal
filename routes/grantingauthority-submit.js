// ********************************************************************
// Gov.UK transparency Subsidy granting authority submit module
// ********************************************************************

const express = require("express");
const axios = require("axios");
var session = require("express-session");
const router = express.Router();
router.post("/", async (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined"
  ) {
    res.redirect("/signout");
  } else {
    if (req.body.editReview == "true") {
      ssn.gaID_extract = req.body.grantingAuthorityID;
      var gaID_Name = {
        name: req.body.grantingAuthorityName,
      };
      console.log("ssn.gaID_extract", ssn.gaID_extract);
      console.log("gaID_Name", req.body.grantingAuthorityName);
      try {
        const apidata = await axios.put(
          beis_url_searchscheme + "/grantingAuthority/" + ssn.gaID_extract,
          gaID_Name,
          ssn.UserPrincileObjectGlobal
        );
        // const gaID = apidata.gaId;
        res.set("X-Frame-Options", "DENY");
        res.set("X-Content-Type-Options", "nosniff");
        res.set("Content-Security-Policy", 'frame-ancestors "self"');
        res.set("Access-Control-Allow-Origin", beis_url_searchscheme);
        res.set(
          "Strict-Transport-Security",
          "max-age=31536000; includeSubDomains"
        );
        const review = req.body.editReview;
        res.render("bulkupload/grantingauthority-addsuccessfully", {
          // ssn.gaID_extract,
          ssn,
          review,
        });
      } catch (err) {
        if (err.toString().includes("500"))
          res.render("bulkupload/notAvailable");
        else if (err.toString().includes("401"))
          res.render("bulkupload/notAuthorized");
        console.log("message error : " + err);

        // res.render('publicusersearch/noresults');
      }
    } else {
      try {
        // var userPrincipleRequest = new Object();
        // userPrincipleRequest.password = "password123";
        // userPrincipleRequest.role = ssn.dashboard_roles;
        // userPrincipleRequest.grantingAuthorityGroupId = dashbaord_ga_ID;
        // userPrincipleRequest.grantingAuthorityGroupName = ssn.dashboard_ga_name;
        // userPrincipleRequest.userName = ssn.dashboard_user_name;

        res.set("X-Frame-Options", "DENY");
        res.set("Content-Security-Policy", 'frame-ancestors "self"');
        res.set("Access-Control-Allow-Origin", beis_url_searchscheme);
        res.set(
          "Strict-Transport-Security",
          "max-age=31536000; includeSubDomains"
        );
        var data1 = {
          name: req.body.GaName,
          userName: ssn.dashboard_user_name,
        };
        // data = JSON.parse(JSON.stringify(data));
        // console.log("userPrincipleRequest",ssn);
        console.log("beis_url_searchscheme", beis_url_searchscheme);
        console.log("data", data1);

        const apidata = await axios.post(
          beis_url_searchscheme + "/grantingAuthority",
          data1
        );
        var apidata_extract = apidata.data;
        ssn.gaID_extract = apidata_extract.gaId;
        console.log("ssn.gaID_extract", ssn.gaID_extract);
        const review = "";
        res.render("bulkupload/grantingauthority-addsuccessfully", {
          // ssn.gaID_extract,
          ssn,
          review,
        });
      } catch (err) {
        response_error_message = err;
        console.log("message error GA : " + err);
        if (err.toString().includes("500")) {
          ssn.grantingAuthorityName_Error = true;
          ssn.grantingAuthorityName_Error_Msg =
            "Granting Authority already added";
          ssn.grantingAuthorityName_Global = req.body.GaName;
          res.render("bulkupload/grantingauthority-add", {
            ssn,
            // ssn.grantingAuthorityName_Error,
            // ssn.grantingAuthorityName_Error_Msg,
            // ssn.grantingAuthorityName_Global,
          });
        }
      }
    }
  }
});

module.exports = router;
