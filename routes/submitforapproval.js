const express = require("express");
const router = express.Router();
const axios = require("axios");
var request = require("request");

router.post("/", async (req, res) => {
  if (typeof Subsidy_Full_Amount_Range_Global == "undefined") {
    Subsidy_Full_Amount_Range_Global = "";
  }
  if (typeof Subsidy_Element_Full_Amount_Global == "undefined") {
    Subsidy_Element_Full_Amount_Global = "";
  }

  subsidy_legal_granting_date =
    Legal_Granting_Date_Day_Global +
    "-" +
    Legal_Granting_Date_Month_Global +
    "-" +
    Legal_Granting_Date_Year_Global;

  var SubsidyErrors = [];
  var SubsidyFocus = [];
  var Subsidy_Control_Number_Error = false;
  var Subsidy_Measure_Title_Error = false;
  var Subsidy_Objective_Error = false;
  var Subsidy_Instrument_Error = false;
  var Subsidy_Element_Full_Amount_Error = false;
  var Subsidy_Full_Amount_Range_Error = false;
  var National_ID_Type_Error = false;
  var National_ID_Number_Error = false;
  var Beneficiary_Name_Error = false;
  var Size_of_the_Organisation_Error = false;
  var Granting_Authority_Name_Error = false;
  var Legal_Granting_Date_Day_Error = false;
  var Legal_Granting_Date_Month_Error = false;
  var Legal_Granting_Date_Year_Error = false;
  var Goods_or_Services_Error = false;
  var Spending_Region_Error = false;
  var Spending_Sector_Error = false;

  const addAwardRequest = {
    subsidyControlTitle: Subsidy_Measure_Title_Global,
    subsidyControlNumber: Subsidy_Control_Number_Global,
    nationalIdType: National_ID_Type_Global,
    nationalId: National_ID_Number_Global,
    beneficiaryName: Beneficiary_Name_Global,
    orgSize: Size_of_the_Organisation_Global,
    subsidyInstrument: Subsidy_Instrument_Global,
    subsidyObjective: Subsidy_Objective_Global,
    subsidyAmountRange: Subsidy_Full_Amount_Range_Global,
    subsidyAmountExact: Subsidy_Element_Full_Amount_Global,
    legalGrantingDate: subsidy_legal_granting_date,
    grantingAuthorityName: Granting_Authority_Name_Global,
    goodsOrServices: Goods_or_Services_Global,
    spendingRegion: Spending_Region_Global,
    spendingSector: Spending_Sector_Global,
    subsidyObjectiveOther: "",
    subsidyInstrumentOther: "",
  };

  var data = JSON.parse(JSON.stringify(addAwardRequest));
  console.log("request :" + JSON.stringify(data));

  try {
    const apidata = await axios.post(beis_url_publishing + "/addAward", data);
    console.log(`Status: ${apidata.status}`);
    API_response_code = `${apidata.status}`;
    console.log("API_response_code: " + API_response_code);
    console.log("Body: ", apidata.data);
    var add_award_response = apidata.data;
    var Additem = 0;

    if (add_award_response.totalErrors > 0) {
      for (i = 0; i < add_award_response.totalErrors; i = i + 1) {
        console.log(
          "add_award_response:  " +
            add_award_response.validationErrorResult[i].column
        );
        console.log(
          "add_award_response:  " +
            add_award_response.validationErrorResult[i].message
        );

        if (
          add_award_response.validationErrorResult[i].column ==
          "subsidyControlNumber"
        ) {
          Subsidy_Control_Number_Error = true;
          SubsidyErrors[Additem] =
            add_award_response.validationErrorResult[i].message;
          SubsidyFocus[Additem] = "#Subsidy_Control_Number";
          Additem = Additem + 1;
        }

        if (
          add_award_response.validationErrorResult[i].column ==
          "subsidyControlTitle"
        ) {
          Subsidy_Measure_Title_Error = true;
          SubsidyErrors[Additem] =
            add_award_response.validationErrorResult[i].message;
          SubsidyFocus[Additem] = "#Subsidy_Measure_Title";
          Additem = Additem + 1;
        }

        if (
          add_award_response.validationErrorResult[i].column == "nationalId"
        ) {
          Subsidy_Measure_Title_Error = true;
          SubsidyErrors[Additem] =
            add_award_response.validationErrorResult[i].message;
          SubsidyFocus[Additem] = "#National_ID_Number";
          Additem = Additem + 1;
        }

        if (
          add_award_response.validationErrorResult[i].column == "nationalIdType"
        ) {
          Subsidy_Measure_Title_Error = true;
          SubsidyErrors[Additem] =
            add_award_response.validationErrorResult[i].message;
          SubsidyFocus[Additem] = "#National_ID_Type";
          Additem = Additem + 1;
        }

        if (
          add_award_response.validationErrorResult[i].column ==
          "subsidyObjective"
        ) {
          Subsidy_Measure_Title_Error = true;
          SubsidyErrors[Additem] =
            add_award_response.validationErrorResult[i].message;
          SubsidyFocus[Additem] = "#Subsidy_Objective";
          Additem = Additem + 1;
        }

        if (
          add_award_response.validationErrorResult[i].column == "spendingRegion"
        ) {
          Subsidy_Measure_Title_Error = true;
          SubsidyErrors[Additem] =
            add_award_response.validationErrorResult[i].message;
          SubsidyFocus[Additem] = "#Spending_Region";
          Additem = Additem + 1;
        }

        if (
          add_award_response.validationErrorResult[i].column ==
          "subsidyInstrument"
        ) {
          Subsidy_Measure_Title_Error = true;
          SubsidyErrors[Additem] =
            add_award_response.validationErrorResult[i].message;
          SubsidyFocus[Additem] = "#Subsidy_Instrument";
          Additem = Additem + 1;
        }

        if (
          add_award_response.validationErrorResult[i].column ==
          "grantingAuthorityName"
        ) {
          Granting_Authority_Name_Error = true;
          SubsidyErrors[Additem] =
            add_award_response.validationErrorResult[i].message;
          SubsidyFocus[Additem] = "#Granting_Authority_Name";
          Additem = Additem + 1;
        }
      } /*end for FOR loop */

      var SubsidyArraySize = SubsidyErrors.length;
      var isAddSubsidyPrimarycall = false;

      res.render("bulkupload/addsubsidyaward", {
        Subsidy_Control_Number_Global,
        Subsidy_Measure_Title_Global,
        Subsidy_Objective_Global,
        Subsidy_Instrument_Global,
        Subsidy_Element_Full_Amount_Global,
        Subsidy_Full_Amount_Range_Global,
        National_ID_Type_Global,
        National_ID_Number_Global,
        Beneficiary_Name_Global,
        Size_of_the_Organisation_Global,
        Granting_Authority_Name_Global,
        Legal_Granting_Date_Day_Global,
        Legal_Granting_Date_Month_Global,
        Legal_Granting_Date_Year_Global,
        Goods_or_Services_Global,
        Spending_Region_Global,
        Spending_Sector_Global,

        Subsidy_Control_Number_Error,
        Subsidy_Measure_Title_Error,
        Subsidy_Objective_Error,
        Subsidy_Instrument_Error,
        Subsidy_Element_Full_Amount_Error,
        Subsidy_Full_Amount_Range_Error,
        National_ID_Type_Error,
        National_ID_Number_Error,
        Beneficiary_Name_Error,
        Size_of_the_Organisation_Error,
        Granting_Authority_Name_Error,
        Legal_Granting_Date_Day_Error,
        Legal_Granting_Date_Month_Error,
        Legal_Granting_Date_Year_Error,
        Goods_or_Services_Error,
        Spending_Region_Error,
        Spending_Sector_Error,

        SubsidyErrors,
        SubsidyArraySize,
        SubsidyFocus,

        isAddSubsidyPrimarycall,
      });
    } else {
      res.render("bulkupload/submitforapproval", {
        Subsidy_Control_Number_Global,
        Subsidy_Control_Number_Global_Substring,
      });
    }
  } catch (err) {
    response_error_message = err;
    console.log("message error : " + err);
    console.log("response_error_message catch : " + response_error_message);
    // res.render('bulkupload/submitforapproval',{ Subsidy_Control_Number_Global,Subsidy_Control_Number_Global_Substring })
  }
});

module.exports = router;
