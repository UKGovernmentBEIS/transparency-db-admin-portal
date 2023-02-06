// ********************************************************************
// Gov.UK transparency subsidy scheme submit for approval or publish module
// ********************************************************************

const express = require("express");
var session = require("express-session");
const router = express.Router();

const axios = require("axios");
var request = require("request");

router.post("/", async (req, res) => {
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


    console.log("request :" + JSON.stringify(data));
    console.log("SSN :" + JSON.stringify(ssn.UserPrincileObjectGlobal));
    try {
      if (isCallfromEditScheme) {
        var apidata = await axios.put(
          beis_url_publishing + "/scheme/" + ssn.Edit_Scheme_Number_global,
          data,
          ssn.UserPrincileObjectGlobal
        );
      } else {
        var apidata = await axios.post(
          beis_url_publishing + "/addScheme",
          data,
          ssn.UserPrincileObjectGlobal
        );
      }

      console.log(`Status: ${apidata.status}`);
      API_response_code = `${apidata.status}`;
      console.log("API_response_code: " + API_response_code);
      console.log("Body: ", apidata.data);
      var add_scheme_response = apidata.data;

      if (add_scheme_response.totalErrors > 0) {
        for (i = 0; i < add_scheme_response.totalErrors; i = i + 1) {
          console.log(
            "add_scheme_response:  " +
              add_scheme_response.validationErrorResult[i].column
          );
          console.log(
            "add_scheme_response:  " +
              add_scheme_response.validationErrorResult[i].message
          );
        }

        ssn.SubsidyArraySize = ssn.SubsidyErrors.length;
        var isAddSubsidyPrimarycall = false;

        res.render("bulkupload/addsubsidyscheme", {
          ssn,
          isAddSubsidyPrimarycall,
        });
      } else {
        isCallfromEditScheme = false;
        var Subsidy_Scheme_Number = add_scheme_response.message.split(" ");
        SubsidySchemeNumber = Subsidy_Scheme_Number[0];
        bulkupload = false;
        console.log("SubsidySchemeNumber", SubsidySchemeNumber);
        res.render("bulkupload/bulksubsidymeasure-published", {
          bulkupload,
          SubsidyschemeNumber,
        });
      }
    } catch (err) {
      console.log("message error : ", err);
      if (err.toString().includes("401"))
        res.render("bulkupload/notAuthorized");
      else if (err.toString().includes("500"))
        res.render("bulkupload/notAvailable");
    }
  }
});

module.exports = router;
