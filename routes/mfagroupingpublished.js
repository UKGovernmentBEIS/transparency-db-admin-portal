// ********************************************************************
// Gov.UK transparency subsidy scheme published module
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
    var { button_value } = req.body;

    const addMfaGroupingRequest = {
      mfaGroupingName: ssn.MFA_Grouping_Name_Global.trim(),
      grantingAuthorityName: ssn.Granting_Authority_Name_Global.trim(),
      status: "Active",
    };

    if (button_value == "add_mfa_grouping") {
      addMfaGroupingUrl = beis_url_publishing + "/mfa/grouping/add";

      try {
        const apidata = await axios.post(
          addMfaGroupingUrl,
          addMfaGroupingRequest,
          ssn.UserPrincileObjectGlobal
        );

        API_response_code = `${apidata.status}`;

        ssn.MFA_Grouping_Number_Global = apidata.data;

        res.render("mfa/mfagroupingpublished", {
          ssn,
          button_value,
        });
      } catch (err) {

        console.log("message error : " + err.message);
        if (err.toString().includes("401")) {
          res.render("bulkupload/notAuthorized");
        }
        if (err.toString().includes("417")) {
          res.render("bulkupload/notAuthorized");
        }
        if (err.toString().includes("500")) {
          res.render("bulkupload/notAvailable");
        }
        if (err.toString().includes("400")) {
          ssn.Granting_Authority_Name_Inactive_Error = true;
          ssn.SubsidyErrors.push(" Granting authority is not active");
          ssn.SubsidyFocus.push("#Granting_Authority_Name");
          // Additem = Additem + 1;
          ssn.SubsidyArraySize = ssn.SubsidyErrors.length;
          res.render("mfa/mfagroupingadd", { ssn });
        }
      }
    }

    // this is for update existing subsidy measure using PUT call
    else {
      const updateSchemeRequest = {
        adhoc: ssn.Subsidy_Adhoc_Global_Flag,
        gaName: ssn.Granting_Authority_Name_Measure_Global,
        subsidyMeasureTitle: ssn.Subsidy_Measure_Title_Global,
        legalBasisText: ssn.Legal_Basis_Global,
        gaSubsidyWebLink: ssn.Granting_Authority_URL_Global,
        gaSubsidyWebLinkDescription: ssn.Granting_Authority_Policy_Global,
        budget: ssn.Budget_Global,
        startDate: subsidy_start_date,
        endDate: subsidy_end_date,
        status: "Active",
        hasNoEndDate: ssn.Has_No_End_Date_Global
      };

      updateSchemeUrl =
        beis_url_searchscheme + "/mfa/grouping/update/" + ssn.scNumber_Global;

      try {
        const apidata = await axios.put(
          updateSchemeUrl,
          updateSchemeRequest,
          ssn.UserPrincileObjectGlobal
        );

        API_response_code = `${apidata.status}`;

        ssn.Subsidy_Control_Number_Global_Text = apidata.data;

        res.render("bulkupload/subsidymeasure-published", {
          ssn,
          button_value,
          // ssn.Subsidy_Control_Number_Global_Text,
        });
      } catch (err) {
        if (err.toString().includes("401")) {
          res.render("bulkupload/notAuthorized");
        } else if (err.toString().includes("500"))
          res.render("bulkupload/notAvailable");

        console.log("message error : " + err);
      }
    }
  }
});

module.exports = router;
