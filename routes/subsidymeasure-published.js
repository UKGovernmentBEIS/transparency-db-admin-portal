const express = require("express");
var session = require("express-session");
const router = express.Router();

const axios = require("axios");
var request = require("request");

router.post("/", async (req, res) => {
  ssn = req.session;
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  var { button_value } = req.body;

  console.log("button_value : " + button_value);

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
  scheme_issued_start_year_Error = false;
  scheme_issued_start_month_Error = false;
  scheme_issued_start_day_Error = false;
  scheme_issued_end_year_Error = false;
  scheme_issued_end_month_Error = false;
  scheme_issued_end_day_Error = false;

  // ssn.Granting_Authority_Name_Global = "Big Lottery Fund";
  console.log("ssn.Subsidy_Adhoc_Global :" + ssn.Subsidy_Adhoc_Global);
  console.log(
    "ssn.Granting_Authority_Name_Global :" +
      ssn.Granting_Authority_Name_Measure_Global
  );
  console.log(
    "ssn.Subsidy_Measure_Title_Global :" + ssn.Subsidy_Measure_Title_Global
  );
  console.log("ssn.Legal_Basis_Global :" + ssn.Legal_Basis_Global);
  console.log(
    "ssn.Granting_Authority_URL_Global :" + ssn.Granting_Authority_URL_Global
  );
  console.log(
    "ssn.Granting_Authority_Policy_Global:" +
      ssn.Granting_Authority_Policy_Global
  );
  console.log("ssn.Budget_Global :" + ssn.Budget_Global);
  console.log("subsidy_start_date :" + subsidy_start_date);
  console.log("subsidy_end_date:" + subsidy_end_date);

  if (ssn.Subsidy_Adhoc_Global == "Yes") {
    ssn.Subsidy_Adhoc_Global_Flag = true;
  } else {
    ssn.Subsidy_Adhoc_Global_Flag = false;
  }

  const addSchemeRequest = {
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
  };

  if (button_value == "add_measure") {
    addSchemeUrl = beis_url_searchscheme + "/scheme/add";
    console.log(" addSchemeUrl : " + addSchemeUrl);
    console.log("addSchemeRequest :" + JSON.stringify(addSchemeRequest));

    try {
      const apidata = await axios.post(
        addSchemeUrl,
        addSchemeRequest,
        ssn.UserPrincileObjectGlobal
      );
      console.log(`Status: ${apidata.status}`);
      API_response_code = `${apidata.status}`;
      console.log("API_response_code: " + API_response_code);
      console.log("Body: ", apidata.data);
      ssn.Subsidy_Control_Number_Global_Text = apidata.data;
      var add_award_response = apidata.data;
      var Additem = 0;

      res.render("bulkupload/subsidymeasure-published", {
        ssn,
        // ssn.Subsidy_Control_Number_Global_Text,
      });
    } catch (err) {
      response_error_message = err;
      console.log("message error : " + err);
      console.log("response_error_message catch : " + response_error_message);
      if (err.toString().includes("401")) {
        res.render("bulkupload/notAuthorized");
      }
      if (err.toString().includes("417")) {
        res.render("bulkupload/notAuthorized");
      }
      if (err.toString().includes("500")) {
        res.render("bulkupload/notAvailable");
      }
    }
  }

  // this is for update existing subsidy measure using PUT call
  else {
    const updateSchemeRequest = {
      scNumber: scNumber_Global,
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
    };

    updateSchemeUrl = beis_url_searchscheme + "/scheme/update";
    console.log(" updateSchemeUrl : " + updateSchemeUrl);
    console.log("updateSchemeRequest :" + JSON.stringify(updateSchemeRequest));

    try {
      const apidata = await axios.post(
        updateSchemeUrl,
        updateSchemeRequest,
        ssn.UserPrincileObjectGlobal
      );
      console.log(`Status: ${apidata.status}`);
      API_response_code = `${apidata.status}`;
      console.log("API_response_code: " + API_response_code);
      console.log("Body: ", apidata.data);
      ssn.Subsidy_Control_Number_Global_Text = apidata.data;
      var add_award_response = apidata.data;
      var Additem = 0;

      res.render("bulkupload/subsidymeasure-published", {
        ssn,
        // ssn.Subsidy_Control_Number_Global_Text,
      });
    } catch (err) {
      response_error_message = err;
      if (err.includes("401")) {
        res.render("bulkupload/subsidymeasure-notauthorized");
      } else if (err.toString().includes("500"))
        res.render("bulkupload/notAvailable");

      console.log("message error : " + err);
      console.log("response_error_message catch : " + err.message);
    }
  }
});

module.exports = router;

// if (add_award_response.totalErrors > 0) {
//   add_award_response.validationErrorResult.forEach(function (i, obj) {
//     if (obj.column == "subsidyControlTitle") {
//       ssn.Subsidy_Measure_Title_Error = true;
//       SubsidyErrors[Additem] = obj.message;
//       SubsidyFocus[Additem] = "#Subsidy_Measure_Title";
//       Additem = Additem + 1;
//     }

//     if (obj.column == "nationalId") {
//       ssn.National_ID_Number_Error = true;
//       SubsidyErrors[Additem] = obj.message;
//       SubsidyFocus[Additem] = "#National_ID_Number";
//       Additem = Additem + 1;
//     }

//     if (obj.column == "nationalIdType") {
//       ssn.National_ID_Type_Error = true;
//       SubsidyErrors[Additem] = obj.message;
//       SubsidyFocus[Additem] = "#National_ID_Type";
//       Additem = Additem + 1;
//     }

//     if (obj.column == "subsidyObjective") {
//       ssn.Subsidy_Objective_Error = true;
//       SubsidyErrors[Additem] = obj.message;
//       SubsidyFocus[Additem] = "#Subsidy_Objective";
//       Additem = Additem + 1;
//     }

//     if (obj.column == "SubsidyObjective-other") {
//       ssn.Subsidy_Objective_Other_Error = true;
//       SubsidyErrors[Additem] = obj.message;
//       SubsidyFocus[Additem] = "#Subsidy_Objective_Other";
//       Additem = Additem + 1;
//     }

//     if (obj.column == "spendingRegion") {
//       ssn.Spending_Region_Error = true;
//       SubsidyErrors[Additem] = obj.message;
//       SubsidyFocus[Additem] = "#Spending_Region";
//       Additem = Additem + 1;
//     }

//     if (obj.column == "subsidyInstrument") {
//       ssn.Subsidy_Instrument_Error = true;
//       SubsidyErrors[Additem] = obj.message;
//       SubsidyFocus[Additem] = "#Subsidy_Instrument";
//       Additem = Additem + 1;
//     }

//     if (obj.column == "SubsidyInstrument-other") {
//       ssn.Subsidy_Instrument_Other_Error = true;
//       SubsidyErrors[Additem] = obj.message;
//       SubsidyFocus[Additem] = "#Subsidy_Instrument_Other";
//       Additem = Additem + 1;
//     }

//     if (obj.column == "subsidyAmountExact") {
//       ssn.Subsidy_Element_Full_Amount_Error = true;
//       SubsidyErrors[Additem] = obj.message;
//       SubsidyFocus[Additem] = "#Subsidy_Element_Full_Amount";
//       Additem = Additem + 1;
//     }

//     if (obj.column == "grantingAuthorityName") {
//       ssn.Granting_Authority_Name_Error = true;
//       SubsidyErrors[Additem] = obj.message;
//       SubsidyFocus[Additem] = "#Granting_Authority_Name";
//       Additem = Additem + 1;
//     }
//     s;
//   });

//   var SubsidyArraySize = SubsidyErrors.length;
//   var isAddSubsidyPrimarycall = false;

//   res.render("bulkupload/addsubsidymeasures", {
//     ssn.Subsidy_Measure_Title_Global,
//     ssn.Subsidy_Adhoc_Global,

//     ssn.Subsidy_Measure_Title_Error,
//     ssn.Subsidy_Adhoc_Error,
//     SubsidyErrors,
//     SubsidyArraySize,
//     SubsidyFocus,

//     isAddSubsidyPrimarycall,
//   });
// } else {
