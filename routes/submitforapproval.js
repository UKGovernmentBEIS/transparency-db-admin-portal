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

  if (typeof ssn.Subsidy_Full_Amount_Range_Global == "undefined") {
    ssn.Subsidy_Full_Amount_Range_Global = "NA";
  }
  if (typeof ssn.Subsidy_Element_Full_Amount_Global == "undefined") {
    ssn.Subsidy_Element_Full_Amount_Global = "NA";
  }

  subsidy_legal_granting_date =
    ssn.Legal_Granting_Date_Day_Global +
    "-" +
    ssn.Legal_Granting_Date_Month_Global +
    "-" +
    ssn.Legal_Granting_Date_Year_Global;

  var SubsidyErrors = [];
  var SubsidyFocus = [];
  ssn.Subsidy_Control_Number_Error = false;
  ssn.Subsidy_Measure_Title_Error = false;
  ssn.Subsidy_Adhoc_Error = false;
  ssn.Subsidy_Objective_Error = false;
  ssn.Subsidy_Objective_Other_Error = false;
  ssn.Subsidy_Instrument_Error = false;
  ssn.Subsidy_Instrument_Other_Error = false;
  ssn.Subsidy_Element_Full_Amount_Error = false;
  ssn.Subsidy_Full_Amount_Range_Error = false;
  ssn.National_ID_Type_Error = false;
  ssn.National_ID_Number_Error = false;
  ssn.Beneficiary_Name_Error = false;
  ssn.Size_of_the_Organisation_Error = false;
  ssn.Granting_Authority_Name_Error = false;
  ssn.Legal_Granting_Date_Day_Error = false;
  ssn.Legal_Granting_Date_Month_Error = false;
  ssn.Legal_Granting_Date_Year_Error = false;
  ssn.Goods_or_Services_Error = false;
  ssn.Spending_Region_Error = false;
  ssn.Spending_Sector_Error = false;

  if (ssn.Subsidy_Full_Amount_Range_Global == "Empty") {
    Subsidy_Full_Amount_Range_Global_Trim = "NA";
  } else {
    Subsidy_Full_Amount_Range_Global_Trim =
      ssn.Subsidy_Full_Amount_Range_Global;
  }
  Subsidy_Element_Full_Amount_Global_Trim = parseFloat(
    ssn.Subsidy_Element_Full_Amount_Global.replace(/\,/g, "")
  );

  console.log(
    "Subsidy_Element_Full_Amount_Global_Trim:" +
      Subsidy_Element_Full_Amount_Global_Trim
  );

  if (ssn.Subsidy_Objective_Global !== "Other") {
    ssn.Subsidy_Objective_Other_Global = "";
  }

  if (ssn.Subsidy_Instrument_Global !== "Other") {
    ssn.Subsidy_Instrument_Other_Global = "";
  }

  const addAwardRequest = {
    subsidyControlTitle: ssn.Subsidy_Measure_Title_Global,
    subsidyControlNumber: ssn.Subsidy_Control_Number_Global,
    nationalIdType: ssn.National_ID_Type_Global,
    nationalId: ssn.National_ID_Number_Global,
    beneficiaryName: ssn.Beneficiary_Name_Global,
    orgSize: ssn.Size_of_the_Organisation_Global,
    subsidyInstrument: ssn.Subsidy_Instrument_Global,
    subsidyObjective: ssn.Subsidy_Objective_Global,
    subsidyAmountRange: Subsidy_Full_Amount_Range_Global_Trim,
    subsidyAmountExact: Subsidy_Element_Full_Amount_Global_Trim,
    legalGrantingDate: subsidy_legal_granting_date,
    grantingAuthorityName: ssn.Granting_Authority_Name_Global,
    goodsOrServices: ssn.Goods_or_Services_Global,
    spendingRegion: ssn.Spending_Region_Global,
    spendingSector: ssn.Spending_Sector_Global,
    subsidyObjectiveOther: ssn.Subsidy_Objective_Other_Global,
    subsidyInstrumentOther: ssn.Subsidy_Instrument_Other_Global,
  };

  if (isCallfromEditAward) {
    const updateAwardRequest = {
      awardNumber: ssn.Edit_Award_Number_global,
      subsidyControlTitle: ssn.Subsidy_Measure_Title_Global,
      subsidyControlNumber: ssn.Subsidy_Control_Number_Global,
      nationalIdType: ssn.National_ID_Type_Global,
      nationalId: ssn.National_ID_Number_Global,
      beneficiaryName: ssn.Beneficiary_Name_Global,
      orgSize: ssn.Size_of_the_Organisation_Global,
      subsidyInstrument: ssn.Subsidy_Instrument_Global,
      subsidyObjective: ssn.Subsidy_Objective_Global,
      subsidyAmountRange: Subsidy_Full_Amount_Range_Global_Trim,
      subsidyAmountExact: Subsidy_Element_Full_Amount_Global_Trim,
      legalGrantingDate: subsidy_legal_granting_date,
      grantingAuthorityName: ssn.Granting_Authority_Name_Global,
      goodsOrServices: ssn.Goods_or_Services_Global,
      spendingRegion: ssn.Spending_Region_Global,
      spendingSector: ssn.Spending_Sector_Global,
      subsidyObjectiveOther: ssn.Subsidy_Objective_Other_Global,
      subsidyInstrumentOther: ssn.Subsidy_Instrument_Other_Global,
    };

    var data = JSON.parse(JSON.stringify(updateAwardRequest));
    console.log("request :" + JSON.stringify(data));
  } else {
    var data = JSON.parse(JSON.stringify(addAwardRequest));
    console.log("SSN :" + JSON.stringify(data));
  }

  try {
    if (isCallfromEditAward) {
      var apidata = await axios.put(
        beis_url_publishing + "/award",
        data,
        ssn.UserPrincileObjectGlobal
      );
    } else {
      var apidata = await axios.post(
        beis_url_publishing + "/addAward",
        data,
        ssn.UserPrincileObjectGlobal
      );
    }

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
          ssn.Subsidy_Control_Number_Error = true;
          SubsidyErrors[Additem] =
            add_award_response.validationErrorResult[i].message;
          SubsidyFocus[Additem] = "#Subsidy_Control_Number";
          Additem = Additem + 1;
        }

        if (
          add_award_response.validationErrorResult[i].column ==
          "subsidyControlTitle"
        ) {
          ssn.Subsidy_Measure_Title_Error = true;
          SubsidyErrors[Additem] =
            add_award_response.validationErrorResult[i].message;
          SubsidyFocus[Additem] = "#Subsidy_Measure_Title";
          Additem = Additem + 1;
        }

        if (
          add_award_response.validationErrorResult[i].column == "nationalId"
        ) {
          ssn.National_ID_Number_Error = true;
          SubsidyErrors[Additem] =
            add_award_response.validationErrorResult[i].message;
          SubsidyFocus[Additem] = "#National_ID_Number";
          Additem = Additem + 1;
        }

        if (
          add_award_response.validationErrorResult[i].column == "nationalIdType"
        ) {
          ssn.National_ID_Type_Error = true;
          SubsidyErrors[Additem] =
            add_award_response.validationErrorResult[i].message;
          SubsidyFocus[Additem] = "#National_ID_Type";
          Additem = Additem + 1;
        }

        if (
          add_award_response.validationErrorResult[i].column ==
          "subsidyObjective"
        ) {
          ssn.Subsidy_Objective_Error = true;
          SubsidyErrors[Additem] =
            add_award_response.validationErrorResult[i].message;
          SubsidyFocus[Additem] = "#Subsidy_Objective";
          Additem = Additem + 1;
        }

        if (
          add_award_response.validationErrorResult[i].column ==
          "SubsidyObjective-other"
        ) {
          ssn.Subsidy_Objective_Other_Error = true;
          SubsidyErrors[Additem] =
            add_award_response.validationErrorResult[i].message;
          SubsidyFocus[Additem] = "#Subsidy_Objective_Other";
          Additem = Additem + 1;
        }

        if (
          add_award_response.validationErrorResult[i].column == "spendingRegion"
        ) {
          ssn.Spending_Region_Error = true;
          SubsidyErrors[Additem] =
            add_award_response.validationErrorResult[i].message;
          SubsidyFocus[Additem] = "#Spending_Region";
          Additem = Additem + 1;
        }

        if (
          add_award_response.validationErrorResult[i].column ==
          "subsidyInstrument"
        ) {
          ssn.Subsidy_Instrument_Error = true;
          SubsidyErrors[Additem] =
            add_award_response.validationErrorResult[i].message;
          SubsidyFocus[Additem] = "#Subsidy_Instrument";
          Additem = Additem + 1;
        }

        if (
          add_award_response.validationErrorResult[i].column ==
          "SubsidyInstrument-other"
        ) {
          ssn.Subsidy_Instrument_Other_Error = true;
          SubsidyErrors[Additem] =
            add_award_response.validationErrorResult[i].message;
          SubsidyFocus[Additem] = "#Subsidy_Instrument_Other";
          Additem = Additem + 1;
        }

        if (
          add_award_response.validationErrorResult[i].column ==
          "subsidyAmountExact"
        ) {
          ssn.Subsidy_Element_Full_Amount_Error = true;
          SubsidyErrors[Additem] =
            add_award_response.validationErrorResult[i].message;
          SubsidyFocus[Additem] = "#Subsidy_Element_Full_Amount";
          Additem = Additem + 1;
        }

        if (
          add_award_response.validationErrorResult[i].column ==
          "grantingAuthorityName"
        ) {
          ssn.Granting_Authority_Name_Error = true;
          SubsidyErrors[Additem] =
            add_award_response.validationErrorResult[i].message;
          SubsidyFocus[Additem] = "#Granting_Authority_Name";
          Additem = Additem + 1;
        }
      } /*end for FOR loop */

      var SubsidyArraySize = SubsidyErrors.length;
      var isAddSubsidyPrimarycall = false;

      res.render("bulkupload/addsubsidyaward", {
        ssn,
        // ssn.Subsidy_Control_Number_Global,
        // ssn.Subsidy_Measure_Title_Global,
        // ssn.Subsidy_Adhoc_Global,
        // ssn.Subsidy_Objective_Global,
        // ssn.Subsidy_Objective_Other_Global,
        // ssn.Subsidy_Instrument_Global,
        // ssn.Subsidy_Instrument_Other_Global,
        // ssn.Subsidy_Element_Full_Amount_Global,
        // ssn.Subsidy_Full_Amount_Range_Global,
        // ssn.National_ID_Type_Global,
        // ssn.National_ID_Number_Global,
        // ssn.Beneficiary_Name_Global,
        // ssn.Size_of_the_Organisation_Global,
        // ssn.Granting_Authority_Name_Global,
        // ssn.Legal_Granting_Date_Day_Global,
        // ssn.Legal_Granting_Date_Month_Global,
        // ssn.Legal_Granting_Date_Year_Global,
        // ssn.Goods_or_Services_Global,
        // ssn.Spending_Region_Global,
        // ssn.Spending_Sector_Global,

        // ssn.Subsidy_Control_Number_Error,
        // ssn.Subsidy_Measure_Title_Error,
        // ssn.Subsidy_Adhoc_Error,
        // ssn.Subsidy_Objective_Error,
        // ssn.Subsidy_Objective_Other_Error,
        // ssn.Subsidy_Instrument_Error,
        // ssn.Subsidy_Instrument_Other_Error,
        // ssn.Subsidy_Element_Full_Amount_Error,
        // ssn.Subsidy_Full_Amount_Range_Error,
        // ssn.National_ID_Type_Error,
        // ssn.National_ID_Number_Error,
        // ssn.Beneficiary_Name_Error,
        // ssn.Size_of_the_Organisation_Error,
        // ssn.Granting_Authority_Name_Error,
        // ssn.Legal_Granting_Date_Day_Error,
        // ssn.Legal_Granting_Date_Month_Error,
        // ssn.Legal_Granting_Date_Year_Error,
        // ssn.Goods_or_Services_Error,
        // ssn.Spending_Region_Error,
        // ssn.Spending_Sector_Error,

        SubsidyErrors,
        SubsidyArraySize,
        SubsidyFocus,

        isAddSubsidyPrimarycall,
      });
    } else {
      isCallfromEditAward = false;
      var Subsidy_Award_Number = add_award_response.message.split(" ");
      SubsidyAwardNumber = Subsidy_Award_Number[0];
      bulkupload = false;
      console.log("SubsidyAwardNumber", SubsidyAwardNumber);
      res.render("bulkupload/submitforapproval", {
        bulkupload,
        SubsidyAwardNumber,
        // ssn.Subsidy_Control_Number_Global_Substring,
      });
    }
  } catch (err) {
    if (err.toString().includes("401")) res.render("bulkupload/notAuthorized");
    else if (err.toString().includes("500"))
      res.render("bulkupload/notAvailable");
    console.log("message error : " + err);
    // res.render('bulkupload/submitforapproval',{ ssn.Subsidy_Control_Number_Global,ssn.Subsidy_Control_Number_Global_Substring })
  }
});

module.exports = router;
