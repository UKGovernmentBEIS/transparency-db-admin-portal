const express = require("express");
const router = express.Router();
const axios = require("axios");
var request = require("request");

router.post("/", async (req, res) => {
  var { button_value } = req.body;

  console.log("button_value : " + button_value);

  if (Scheme_Start_Month_Global.length == 1) {
    Scheme_Start_Month_Global = "0" + Scheme_Start_Month_Global;
  }
  if (Scheme_Start_Day_Global.length < 2) {
    Scheme_Start_Day_Global = "0" + Scheme_Start_Day_Global;
  }
  if (Scheme_End_Month_Global.length < 2) {
    Scheme_End_Month_Global = "0" + Scheme_End_Month_Global;
  }
  if (Scheme_End_Day_Global.length < 2) {
    Scheme_End_Day_Global = "0" + Scheme_End_Day_Global;
  }

  subsidy_start_date =
    Scheme_Start_Year_Global +
    "-" +
    Scheme_Start_Month_Global +
    "-" +
    Scheme_Start_Day_Global;
  subsidy_end_date =
    Scheme_End_Year_Global +
    "-" +
    Scheme_End_Month_Global +
    "-" +
    Scheme_End_Day_Global;

  SubsidyErrors = [];
  SubsidyFocus = [];
  //   var Subsidy_Control_Number_Error = false;
  Subsidy_Measure_Title_Error = false;
  Subsidy_Adhoc_Error = false;
  Granting_Authority_Name_Error = false;
  scheme_issued_start_year_Error = false;
  scheme_issued_start_month_Error = false;
  scheme_issued_start_day_Error = false;
  scheme_issued_end_year_Error = false;
  scheme_issued_end_month_Error = false;
  scheme_issued_end_day_Error = false;

  Granting_Authority_Name_Global = "Northern Ireland Screen";
  console.log("Subsidy_Adhoc_Global :" + Subsidy_Adhoc_Global);
  console.log(
    "Granting_Authority_Name_Global :" + Granting_Authority_Name_Global
  );
  console.log("Subsidy_Measure_Title_Global :" + Subsidy_Measure_Title_Global);
  console.log("Legal_Basis_Global :" + Legal_Basis_Global);
  console.log(
    "Granting_Authority_URL_Global :" + Granting_Authority_URL_Global
  );
  console.log(
    "Granting_Authority_Policy_Global:" + Granting_Authority_Policy_Global
  );
  console.log("Budget_Global :" + Budget_Global);
  console.log("subsidy_start_date :" + subsidy_start_date);
  console.log("subsidy_end_date:" + subsidy_end_date);

  if (Subsidy_Adhoc_Global == "Yes") {
    Subsidy_Adhoc_Global_Flag = true;
  } else {
    Subsidy_Adhoc_Global_Flag = false;
  }

  const addSchemeRequest = {
    adhoc: Subsidy_Adhoc_Global_Flag,
    gaName: Granting_Authority_Name_Global,
    subsidyMeasureTitle: Subsidy_Measure_Title_Global,
    legalBasisText: Legal_Basis_Global,
    gaSubsidyWebLink: Granting_Authority_URL_Global,
    gaSubsidyWebLinkDescription: Granting_Authority_Policy_Global,
    budget: Budget_Global,
    startDate: subsidy_start_date,
    endDate: subsidy_end_date,
    status: "Active",
  };

  const updateSchemeRequest = {
    scNumber: scNumber_Global,
    adhoc: Subsidy_Adhoc_Global_Flag,
    gaName: Granting_Authority_Name_Global,
    subsidyMeasureTitle: Subsidy_Measure_Title_Global,
    legalBasisText: Legal_Basis_Global,
    gaSubsidyWebLink: Granting_Authority_URL_Global,
    gaSubsidyWebLinkDescription: Granting_Authority_Policy_Global,
    budget: Budget_Global,
    startDate: subsidy_start_date,
    endDate: subsidy_end_date,
    status: "Active",
  };

  if (button_value == "add_measure") {
    addSchemeUrl = beis_url_searchscheme + "/scheme/add";
    console.log(" addSchemeUrl : " + addSchemeUrl);
    console.log("addSchemeRequest :" + JSON.stringify(addSchemeRequest));

    try {
      const apidata = await axios.post(addSchemeUrl, addSchemeRequest);
      console.log(`Status: ${apidata.status}`);
      API_response_code = `${apidata.status}`;
      console.log("API_response_code: " + API_response_code);
      console.log("Body: ", apidata.data);
      Subsidy_Control_Number_Global_Text = apidata.data;
      var add_award_response = apidata.data;
      var Additem = 0;

      res.render("bulkupload/subsidymeasure-published", {
        Subsidy_Control_Number_Global_Text,
      });
    } catch (err) {
      response_error_message = err;
      console.log("message error : " + err);
      console.log("response_error_message catch : " + response_error_message);
    }
  }

  // this is for update existing subsidy measure using PUT call
  else {
    updateSchemeUrl = beis_url_searchscheme + "/scheme/update";
    console.log(" updateSchemeUrl : " + updateSchemeUrl);
    console.log("updateSchemeRequest :" + JSON.stringify(updateSchemeRequest));

    try {
      const apidata = await axios.post(updateSchemeUrl, updateSchemeRequest);
      console.log(`Status: ${apidata.status}`);
      API_response_code = `${apidata.status}`;
      console.log("API_response_code: " + API_response_code);
      console.log("Body: ", apidata.data);
      Subsidy_Control_Number_Global_Text = apidata.data;
      var add_award_response = apidata.data;
      var Additem = 0;

      res.render("bulkupload/subsidymeasure-published", {
        Subsidy_Control_Number_Global_Text,
      });
    } catch (err) {
      response_error_message = err;
      console.log("message error : " + err);
      console.log("response_error_message catch : " + response_error_message);
    }
  }
});

module.exports = router;

// if (add_award_response.totalErrors > 0) {
//   add_award_response.validationErrorResult.forEach(function (i, obj) {
//     if (obj.column == "subsidyControlTitle") {
//       Subsidy_Measure_Title_Error = true;
//       SubsidyErrors[Additem] = obj.message;
//       SubsidyFocus[Additem] = "#Subsidy_Measure_Title";
//       Additem = Additem + 1;
//     }

//     if (obj.column == "nationalId") {
//       National_ID_Number_Error = true;
//       SubsidyErrors[Additem] = obj.message;
//       SubsidyFocus[Additem] = "#National_ID_Number";
//       Additem = Additem + 1;
//     }

//     if (obj.column == "nationalIdType") {
//       National_ID_Type_Error = true;
//       SubsidyErrors[Additem] = obj.message;
//       SubsidyFocus[Additem] = "#National_ID_Type";
//       Additem = Additem + 1;
//     }

//     if (obj.column == "subsidyObjective") {
//       Subsidy_Objective_Error = true;
//       SubsidyErrors[Additem] = obj.message;
//       SubsidyFocus[Additem] = "#Subsidy_Objective";
//       Additem = Additem + 1;
//     }

//     if (obj.column == "SubsidyObjective-other") {
//       Subsidy_Objective_Other_Error = true;
//       SubsidyErrors[Additem] = obj.message;
//       SubsidyFocus[Additem] = "#Subsidy_Objective_Other";
//       Additem = Additem + 1;
//     }

//     if (obj.column == "spendingRegion") {
//       Spending_Region_Error = true;
//       SubsidyErrors[Additem] = obj.message;
//       SubsidyFocus[Additem] = "#Spending_Region";
//       Additem = Additem + 1;
//     }

//     if (obj.column == "subsidyInstrument") {
//       Subsidy_Instrument_Error = true;
//       SubsidyErrors[Additem] = obj.message;
//       SubsidyFocus[Additem] = "#Subsidy_Instrument";
//       Additem = Additem + 1;
//     }

//     if (obj.column == "SubsidyInstrument-other") {
//       Subsidy_Instrument_Other_Error = true;
//       SubsidyErrors[Additem] = obj.message;
//       SubsidyFocus[Additem] = "#Subsidy_Instrument_Other";
//       Additem = Additem + 1;
//     }

//     if (obj.column == "subsidyAmountExact") {
//       Subsidy_Element_Full_Amount_Error = true;
//       SubsidyErrors[Additem] = obj.message;
//       SubsidyFocus[Additem] = "#Subsidy_Element_Full_Amount";
//       Additem = Additem + 1;
//     }

//     if (obj.column == "grantingAuthorityName") {
//       Granting_Authority_Name_Error = true;
//       SubsidyErrors[Additem] = obj.message;
//       SubsidyFocus[Additem] = "#Granting_Authority_Name";
//       Additem = Additem + 1;
//     }
//     s;
//   });

//   var SubsidyArraySize = SubsidyErrors.length;
//   var isAddSubsidyPrimarycall = false;

//   res.render("bulkupload/addsubsidymeasures", {
//     Subsidy_Measure_Title_Global,
//     Subsidy_Adhoc_Global,

//     Subsidy_Measure_Title_Error,
//     Subsidy_Adhoc_Error,
//     SubsidyErrors,
//     SubsidyArraySize,
//     SubsidyFocus,

//     isAddSubsidyPrimarycall,
//   });
// } else {
