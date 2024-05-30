// ********************************************************************
// Gov.UK transparency subsidy award submit for approval or publish module
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

    if (typeof ssn.Subsidy_Full_Amount_Range_Global == "undefined") {
      ssn.Subsidy_Full_Amount_Range_Global = "n/a";
    }
    if (typeof ssn.Subsidy_Element_Full_Amount_Global == "undefined") {
      ssn.Subsidy_Element_Full_Amount_Global = "n/a";
    }

    subsidy_legal_granting_date =
      ssn.Legal_Granting_Date_Day_Global +
      "-" +
      ssn.Legal_Granting_Date_Month_Global +
      "-" +
      ssn.Legal_Granting_Date_Year_Global;

    ssn.SubsidyErrors = [];
    ssn.SubsidyFocus = [];
    ssn.Subsidy_Control_Number_Error = false;
    ssn.Subsidy_Measure_Title_Error = false;
    ssn.Subsidy_Adhoc_Error = false;
    ssn.Subsidy_Objective_Error = false;
    ssn.Subsidy_Objective_Other_Error = false;
    ssn.Subsidy_Objective_Other_255_Error = false;
    ssn.Subsidy_Instrument_Other_255_Error = false;
    ssn.Beneficiary_Name_255_Error = false;
    ssn.Subsidy_Instrument_Error = false;
    ssn.Subsidy_Instrument_Other_Error = false;
    ssn.Subsidy_Element_Full_Amount_Error = false;
    ssn.Subsidy_Element_Full_Amount_Exceed_Error = false;
    ssn.Subsidy_Full_Amount_Range_Error = false;
    ssn.Subsidy_Full_Amount_Range_Exceed_Error = false;
    ssn.National_ID_Type_Error = false;
    ssn.National_ID_Number_Error = false;
    ssn.Beneficiary_Name_Error = false;
    ssn.Size_of_the_Organisation_Error = false;
    ssn.Granting_Authority_Name_Error = false;
    ssn.Granting_Authority_Valid_Name_Error = false;
    ssn.Legal_Granting_Date_Day_Error = false;
    ssn.Legal_Granting_Date_Month_Error = false;
    ssn.Legal_Granting_Date_Year_Error = false;
    ssn.Goods_or_Services_Error = false;
    ssn.Spending_Region_Error = false;
    ssn.Spending_Sector_Error = false;
    ssn.Subsidy_Award_Description_Error = false;
    ssn.Subsidy_Award_Description_Error_Length = false;
    ssn.Subsidy_Award_Interest_Error = false;
    console.log(
      "ssn.Subsidy_Full_Amount_Range_Global ",
      ssn.Subsidy_Full_Amount_Range_Global
    );
    if (ssn.Subsidy_Full_Amount_Range_Global == "n/a") {
      Subsidy_Full_Amount_Range_Global_Trim = "n/a";
    } else {
      var value = ssn.Subsidy_Full_Amount_Range_Global.split("-");
      var firstVal = value[0].split(",").join("").replace("£", "");
      var secondVal = value[1].split(",").join("").replace("£", "");
      Subsidy_Full_Amount_Range_Global_Trim = firstVal + "-" + secondVal;
    }
    Subsidy_Element_Full_Amount_Global_Trim = parseFloat(
      ssn.Subsidy_Element_Full_Amount_Global.replace(/£|,/g, "")
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

    if(!ssn.Subsidy_Control_Number_Global)
    {
      ssn.Subsidy_Control_Number_Global = "";
    }

    if(ssn.Standalone_Award_Global === "No"){
      ssn.Subsidy_Award_Interest_Global = "";
    }

    const addAwardRequest = {
      standaloneAward: ssn.Standalone_Award_Global.trim(),
      subsidyAwardDescription: ssn.Subsidy_Award_Description_Global.trim(),
      subsidyControlTitle: ssn.Subsidy_Measure_Title_Global.trim(),
      subsidyControlNumber: ssn.Subsidy_Control_Number_Global.trim(),
      nationalIdType: ssn.National_ID_Type_Global.trim(),
      nationalId: ssn.National_ID_Number_Global.trim(),
      beneficiaryName: ssn.Beneficiary_Name_Global.trim(),
      orgSize: ssn.Size_of_the_Organisation_Global.trim(),
      subsidyInstrument: ssn.Subsidy_Instrument_Global.trim(),
      subsidyObjective: ssn.Subsidy_Objective_Global.trim(),
      subsidyAmountRange: Subsidy_Full_Amount_Range_Global_Trim,
      subsidyAmountExact: Subsidy_Element_Full_Amount_Global_Trim,
      legalGrantingDate: subsidy_legal_granting_date.trim(),
      grantingAuthorityName: ssn.Granting_Authority_Name_Global.trim(),
      goodsOrServices: ssn.Goods_or_Services_Global.trim(),
      spendingRegion: ssn.Spending_Regions_JSON_Global.trim(),
      spendingSector: ssn.Spending_Sector_Global.trim(),
      subsidyObjectiveOther: ssn.Subsidy_Objective_Other_Global.trim(),
      subsidyInstrumentOther: ssn.Subsidy_Instrument_Other_Global.trim(),
      adminProgramNumber: ssn.Admin_Program_Number_Global.trim(),
      authorityURL: ssn.Authority_URL_Global.trim(),
      authorityURLDescription: ssn.Authority_URL_Description_Global.trim(),
      subsidyAwardInterest: ssn.Subsidy_Award_Interest_Global.trim()
    };

    if (isCallfromEditAward) {
      if (ssn.dashboard_roles != "Granting Authority Encoder")
        status = "Published";
      else status = "Awaiting Approval";
      const updateAwardRequest = {
        awardNumber: ssn.Edit_Award_Number_global,
        standaloneAward: ssn.Standalone_Award_Global.trim(),
        subsidyAwardDescription: ssn.Subsidy_Award_Description_Global.trim(),
        subsidyControlTitle: ssn.Subsidy_Measure_Title_Global.trim(),
        subsidyControlNumber: ssn.Subsidy_Control_Number_Global.trim(),
        nationalIdType: ssn.National_ID_Type_Global.trim(),
        nationalId: ssn.National_ID_Number_Global.trim(),
        beneficiaryName: ssn.Beneficiary_Name_Global.trim(),
        orgSize: ssn.Size_of_the_Organisation_Global.trim(),
        subsidyInstrument: ssn.Subsidy_Instrument_Global.trim(),
        subsidyObjective: ssn.Subsidy_Objective_Global.trim(),
        subsidyAmountRange: Subsidy_Full_Amount_Range_Global_Trim.trim(),
        subsidyAmountExact: Subsidy_Element_Full_Amount_Global_Trim,
        legalGrantingDate: subsidy_legal_granting_date.trim(),
        grantingAuthorityName: ssn.Granting_Authority_Name_Global.trim(),
        goodsOrServices: ssn.Goods_or_Services_Global.trim(),
        spendingRegion: ssn.Spending_Regions_JSON_Global.trim(),
        spendingSector: ssn.Spending_Sector_Global.trim(),
        subsidyObjectiveOther: ssn.Subsidy_Objective_Other_Global.trim(),
        subsidyInstrumentOther: ssn.Subsidy_Instrument_Other_Global.trim(),
        adminProgramNumber: ssn.Admin_Program_Number_Global.trim(),
        authorityURL: ssn.Authority_URL_Global.trim(),
        authorityURLDescription: ssn.Authority_URL_Description_Global.trim(),
        subsidyAwardInterest: ssn.Subsidy_Award_Interest_Global.trim(),
        status: status,
      };

      var data = JSON.parse(JSON.stringify(updateAwardRequest));
      // console.log("request :" + JSON.stringify(data));
    } else {
      var data = JSON.parse(JSON.stringify(addAwardRequest));
    }
    console.log("request :" + JSON.stringify(data));
    console.log("SSN :" + JSON.stringify(ssn.UserPrincileObjectGlobal));
    try {
      if (isCallfromEditAward) {
        var apidata = await axios.put(
          beis_url_publishing + "/award/" + ssn.Edit_Award_Number_global,
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
            ssn.SubsidyErrors[Additem] =
              add_award_response.validationErrorResult[i].message;
            ssn.SubsidyFocus[Additem] = "#Subsidy_Control_Number";
            Additem = Additem + 1;
          }
          if (
            add_award_response.validationErrorResult[i].column ==
            "subsidyAmountRange"
          ) {
            ssn.Subsidy_Full_Amount_Range_Error = false;
            ssn.Subsidy_Full_Amount_Range_Exceed_Error = true;
            ssn.SubsidyErrors[Additem] =
              add_award_response.validationErrorResult[i].message;
            ssn.SubsidyFocus[Additem] = "#Subsidy_Full_Amount_Range";
            Additem = Additem + 1;
          }
          if (
            add_award_response.validationErrorResult[i].column ==
            "subsidyControlNumber or subsidyControlTitle"
          ) {
            ssn.Subsidy_Control_Number_Error = false;
            ssn.Subsidy_Adhoc_Error = true;
            ssn.SubsidyErrors[Additem] =
              add_award_response.validationErrorResult[i].message;
            ssn.SubsidyFocus[Additem] = "#Subsidy_Control_Number";
            Additem = Additem + 1;
          }
          if (
            add_award_response.validationErrorResult[i].column ==
            "subsidyAmountExact"
          ) {
            ssn.Subsidy_Element_Full_Amount_Error = false;
            ssn.Subsidy_Element_Full_Amount_Exceed_Error = true;
            ssn.SubsidyErrors[Additem] =
              add_award_response.validationErrorResult[i].message;
            ssn.SubsidyFocus[Additem] = "#Subsidy_Element_Full_Amount";
            Additem = Additem + 1;
          }
          if (
            add_award_response.validationErrorResult[i].column ==
            "subsidyControlTitle"
          ) {
            ssn.Subsidy_Measure_Title_Error = true;
            ssn.SubsidyErrors[Additem] =
              add_award_response.validationErrorResult[i].message;
            ssn.SubsidyFocus[Additem] = "#Subsidy_Measure_Title";
            Additem = Additem + 1;
          }

          if (
            add_award_response.validationErrorResult[i].column ==
            "#Subsidy_Award_Interest"
          ) {
            ssn.Subsidy_Award_Interest_Error = true;
            ssn.SubsidyErrors[Additem] =
              add_award_response.validationErrorResult[i].message;
            ssn.SubsidyFocus[Additem] = "#Subsidy_Award_Interest";
            Additem = Additem + 1;
          }

          if (
            add_award_response.validationErrorResult[i].column == "nationalId"
          ) {
            ssn.National_ID_Number_Error = true;
            ssn.SubsidyErrors[Additem] =
              add_award_response.validationErrorResult[i].message;
            ssn.SubsidyFocus[Additem] = "#National_ID_Number";
            Additem = Additem + 1;
          }

          if (
            add_award_response.validationErrorResult[i].column ==
            "nationalIdType"
          ) {
            ssn.National_ID_Type_Error = true;
            ssn.SubsidyErrors[Additem] =
              add_award_response.validationErrorResult[i].message;
            ssn.SubsidyFocus[Additem] = "#National_ID_Type";
            Additem = Additem + 1;
          }

          if (
            add_award_response.validationErrorResult[i].column ==
            "subsidyObjective"
          ) {
            ssn.Subsidy_Objective_Error = true;
            ssn.SubsidyErrors[Additem] =
              add_award_response.validationErrorResult[i].message;
            ssn.SubsidyFocus[Additem] = "#Subsidy_Objective";
            Additem = Additem + 1;
          }

          if (
            add_award_response.validationErrorResult[i].column ==
            "SubsidyObjective-other"
          ) {
            ssn.Subsidy_Objective_Other_Error = true;
            ssn.SubsidyErrors[Additem] =
              add_award_response.validationErrorResult[i].message;
            ssn.SubsidyFocus[Additem] = "#Subsidy_Objective_Other";
            Additem = Additem + 1;
          }

          if (
            add_award_response.validationErrorResult[i].column ==
            "spendingRegion"
          ) {
            ssn.Spending_Region_Error = true;
            ssn.SubsidyErrors[Additem] =
              add_award_response.validationErrorResult[i].message;
            ssn.SubsidyFocus[Additem] = "#Spending_Region";
            Additem = Additem + 1;
          }

          if (
            add_award_response.validationErrorResult[i].column ==
            "subsidyInstrument"
          ) {
            ssn.Subsidy_Instrument_Error = true;
            ssn.SubsidyErrors[Additem] =
              add_award_response.validationErrorResult[i].message;
            ssn.SubsidyFocus[Additem] = "#Subsidy_Instrument";
            Additem = Additem + 1;
          }

          if (
            add_award_response.validationErrorResult[i].column ==
            "SubsidyInstrument-other"
          ) {
            ssn.Subsidy_Instrument_Other_Error = true;
            ssn.SubsidyErrors[Additem] =
              add_award_response.validationErrorResult[i].message;
            ssn.SubsidyFocus[Additem] = "#Subsidy_Instrument_Other";
            Additem = Additem + 1;
          }

          if (
            add_award_response.validationErrorResult[i].column ==
            "grantingAuthorityName"
          ) {
            ssn.Granting_Authority_Name_Error = false;
            ssn.Granting_Authority_Valid_Name_Error = true;
            ssn.SubsidyErrors[Additem] =
              add_award_response.validationErrorResult[i].message;
            ssn.SubsidyFocus[Additem] = "#Granting_Authority_Name";
            Additem = Additem + 1;
          }
        } /*end for FOR loop */

        ssn.SubsidyArraySize = ssn.SubsidyErrors.length;
        var isAddSubsidyPrimarycall = false;

        res.render("bulkupload/addsubsidyaward", {
          ssn,
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
