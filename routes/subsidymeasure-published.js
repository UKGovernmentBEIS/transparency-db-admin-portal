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

    console.log("button_value : " + button_value);

    if (ssn.Scheme_Confirmation_Month_Global.length == 1) {
      ssn.Scheme_Confirmation_Month_Global = "0" + ssn.Scheme_Confirmation_Month_Global;
    }
    if (ssn.Scheme_Confirmation_Day_Global.length < 2) {
      ssn.Scheme_Confirmation_Day_Global = "0" + ssn.Scheme_Confirmation_Day_Global;
    }

    if (ssn.Scheme_Start_Month_Global.length == 1) {
      ssn.Scheme_Start_Month_Global = "0" + ssn.Scheme_Start_Month_Global;
    }
    if (ssn.Scheme_Start_Day_Global.length < 2) {
      ssn.Scheme_Start_Day_Global = "0" + ssn.Scheme_Start_Day_Global;
    }

    if (ssn.Scheme_End_Month_Global.length < 2) {
      ssn.Scheme_End_Month_Global = "0" + ssn.Scheme_End_Month_Global;
    }
    if (ssn.Scheme_End_Day_Global.length < 2) {
      ssn.Scheme_End_Day_Global = "0" + ssn.Scheme_End_Day_Global;
    }

    subsidy_confirmation_date =
      ssn.Scheme_Confirmation_Year_Global +
      "-" +
      ssn.Scheme_Confirmation_Month_Global +
      "-" +
      ssn.Scheme_Confirmation_Day_Global;
    subsidy_start_date =
      ssn.Scheme_Start_Year_Global +
      "-" +
      ssn.Scheme_Start_Month_Global +
      "-" +
      ssn.Scheme_Start_Day_Global;
    subsidy_end_date =
      ssn.Scheme_End_Year_Global +
      "-" +
      ssn.Scheme_End_Month_Global +
      "-" +
      ssn.Scheme_End_Day_Global;

    SubsidyErrors = [];
    SubsidyFocus = [];
    //   var ssn.Subsidy_Control_Number_Error = false;
    ssn.Subsidy_Measure_Title_Error = false;
    ssn.Subsidy_Adhoc_Error = false;
    ssn.Granting_Authority_Name_Error = false;
    ssn.Subsidy_Measure_Title_255_Error = false;
    ssn.Granting_Authority_URL_255_Error = false;
    ssn.Granting_Authority_Policy_255_Error = false;
    ssn.scheme_issued_start_year_Error = false;
    ssn.scheme_issued_start_month_Error = false;
    ssn.scheme_issued_start_day_Error = false;
    ssn.scheme_issued_end_year_Error = false;
    ssn.scheme_issued_end_month_Error = false;
    ssn.scheme_issued_end_day_Error = false;
    ssn.scheme_issued_end_day_lesser_Error = false;
    ssn.Subsidy_Scheme_Description_Length_Error = false;
    ssn.scheme_issued_confirmation_day_Error = false;
    ssn.scheme_issued_confirmation_month_Error = false;
    ssn.scheme_issued_confirmation_year_Error = false;
    ssn.Maximum_Amount_Under_Scheme_255_Error = false;
    ssn.Subsidy_Scheme_Interest_Error = false;

    // ssn.Granting_Authority_Name_Global = "Big Lottery Fund";

    if (ssn.Subsidy_Adhoc_Global == "Yes") {
      ssn.Subsidy_Adhoc_Global_Flag = true;
    } else {
      ssn.Subsidy_Adhoc_Global_Flag = false;
    }

    const addSchemeRequest = {
      adhoc: ssn.Subsidy_Adhoc_Global_Flag,
      gaName: ssn.Granting_Authority_Name_Measure_Global,
      subsidyMeasureTitle: ssn.Subsidy_Measure_Title_Global.trim(),
      legalBasisText: ssn.Legal_Basis_Global.trim(),
      gaSubsidyWebLink: ssn.Granting_Authority_URL_Global,
      gaSubsidyWebLinkDescription: ssn.Granting_Authority_Policy_Global.trim(),
      budget: ssn.Budget_Global,
      startDate: subsidy_start_date,
      endDate: subsidy_end_date,
      status: "Active",
      hasNoEndDate: ssn.Has_No_End_Date_Global,
      subsidySchemeDescription: ssn.Subsidy_Scheme_Description_Global,
      confirmationDate: subsidy_confirmation_date,
      spendingSectorJson: ssn.Scheme_Sector_Json_Global,
      maximumAmountUnderScheme: ssn.Maximum_Amount_Under_Scheme_Global,
      subsidySchemeInterest: ssn.Subsidy_Scheme_Interest_Global
    };

    console.log("add scheme data", JSON.stringify(addSchemeRequest));
    if (button_value == "add_measure") {
      addSchemeUrl = beis_url_searchscheme + "/scheme/add";

      try {
        const apidata = await axios.post(
          addSchemeUrl,
          addSchemeRequest,
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
        ssn.SubsidyErrors = [];
        ssn.SubsidyFocus = [];

        ssn.Subsidy_Measure_Title_Error = false;
        ssn.Subsidy_Adhoc_Error = false;
        ssn.Legal_Basis_Error = false;
        ssn.Granting_Authority_Name_Error = false;
        ssn.Granting_Authority_URL_Error = false;

        ssn.Granting_Authority_Policy_Error = false;
        ssn.Budget_Error = false;
        ssn.Subsidy_Measure_Title_255_Error = false;
        ssn.Granting_Authority_URL_255_Error = false;
        ssn.Granting_Authority_Policy_255_Error = false;
        ssn.scheme_issued_start_year_Error = false;
        ssn.scheme_issued_start_month_Error = false;
        ssn.scheme_issued_start_day_Error = false;
        ssn.scheme_issued_end_year_Error = false;
        ssn.scheme_issued_end_month_Error = false;
        ssn.scheme_issued_end_day_Error = false;
        ssn.scheme_issued_end_day_lesser_Error = false;
        ssn.Granting_Authority_Name_Inactive_Error = false;
        isAddSubsidyPrimarycall = false;
        ssn.Subsidy_Scheme_Description_Error = false;
        ssn.Subsidy_Scheme_Description_Length_Error = false;
        ssn.scheme_issued_confirmation_day_Error = false;
        ssn.scheme_issued_confirmation_month_Error = false;
        ssn.scheme_issued_confirmation_year_Error = false;
        ssn.Maximum_Amount_Under_Scheme_255_Error = false;
        ssn.Subsidy_Scheme_Interest_Error = false;

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
          console.log(err.response.data);
          if (err.response.data.message.includes("description")) 
          { 
            ssn.Subsidy_Scheme_Description_Length_Error = true;
            ssn.SubsidyErrors.push("Subsidy scheme description cannot be greater than 10000 characters");
            ssn.SubsidyFocus.push("#Subsidy_Scheme_Description");
          }
          else {
            ssn.Granting_Authority_Name_Inactive_Error = true;
            ssn.SubsidyErrors.push(" public authority is not active");
            ssn.SubsidyFocus.push("#Granting_Authority_Name");
          }
          // Additem = Additem + 1;
          ssn.SubsidyArraySize = ssn.SubsidyErrors.length;
          res.render("bulkupload/subsidymeasures-add", { ssn });
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
        hasNoEndDate: ssn.Has_No_End_Date_Global,
        subsidySchemeDescription: ssn.Subsidy_Scheme_Description_Global,
        confirmationDate: subsidy_confirmation_date,
        spendingSectorJson: ssn.Scheme_Sector_Json_Global,
        maximumAmountUnderScheme: ssn.Maximum_Amount_Under_Scheme_Global,
        subsidySchemeInterest: ssn.Subsidy_Scheme_Interest_Global
      };

      updateSchemeUrl =
        beis_url_searchscheme + "/scheme/update/" + ssn.scNumber_Global;

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
