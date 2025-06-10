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

    mfaAwardConfirmationDate =
      ssn.MFA_Award_Confirmation_Day_Global +
      "-" +
      ssn.MFA_Award_Confirmation_Month_Global +
      "-" +
      ssn.MFA_Award_Confirmation_Year_Global;

    if (button_value == "add_mfa_award") {
      const addMfaAwardRequest = {
        speiAssistance: Boolean(ssn.SPEI_Global.toLowerCase() === "yes"),
        mfaGroupingPresent: Boolean(ssn.MFA_Yes_No_Global.toLowerCase() === "yes"),
        mfaGroupingId: ssn.MFA_Grouping_ID_Global,
        awardFullAmount: ssn.Award_Full_Amount_Global,
        confirmationDate: mfaAwardConfirmationDate,
        grantingAuthorityName: ssn.Granting_Authority_Name_Global,
        beneficiaryName: ssn.MFA_Award_Beneficiary_Name_Global,
        nationalIdType: ssn.MFA_Award_National_ID_Type_Global,
        nationalIdNumber: ssn.MFA_Award_National_ID_Global,
      };

      addMfaAwardUrl = beis_url_publishing + "/mfa/award/add";

      try {
        const apidata = await axios.post(
          addMfaAwardUrl,
          addMfaAwardRequest,
          ssn.UserPrincileObjectGlobal
        );

        API_response_code = `${apidata.status}`;

        ssn.MFA_Award_Number_Global = apidata.data;

        res.render("mfa/mfaawardpublished", {
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
          ssn.SubsidyErrors.push(" Public authority is not active");
          ssn.SubsidyFocus.push("#Granting_Authority_Name");
          // Additem = Additem + 1;
          ssn.SubsidyArraySize = ssn.SubsidyErrors.length;
          res.render("mfa/mfagroupingadd", { ssn });
        }
      }
    }

    // this is for update existing subsidy measure using PUT call
    else {

      if (button_value == "Deleted" || button_value == "Rejected"){
        if (button_value == "Rejected") Award_status = "Reject";
        else Award_status = "Delete";
        Award_status_lower = Award_status.toLowerCase();
        const awardnumber = req.body.awardnumber;
        res.render("mfa/mfaawarddeletereject", {
          ssn,
          Award_status,
          Award_status_lower,
          awardnumber
        });
      }else{

        let updateMfaAwardRequest;
        if(button_value == "Published"){
          updateMfaAwardRequest = {
            mfaAwardNumber: ssn.mfaAwardDetails.mfaAwardNumber,
            speiAssistance: Boolean(ssn.mfaAwardDetails.isSpeiAssistance.toLowerCase() === "yes"),
            mfaGroupingPresent: ssn.mfaAwardDetails.hasMfaGrouping,
            status: "Published",
          };
        }else{

          if (ssn.dashboard_roles != "Granting Authority Encoder") awardStatus = "Published";
          else awardStatus = "Awaiting Approval";
          updateMfaAwardRequest = {
            mfaAwardNumber: ssn.mfaAwardDetails.mfaAwardNumber,
            speiAssistance: Boolean(ssn.SPEI_Global.toLowerCase() === "yes"),
            mfaGroupingPresent: Boolean(ssn.MFA_Yes_No_Global.toLowerCase() === "yes"),
            mfaGroupingId: ssn.MFA_Grouping_ID_Global,
            awardFullAmount: ssn.Award_Full_Amount_Global,
            confirmationDate: mfaAwardConfirmationDate,
            grantingAuthorityName: ssn.Granting_Authority_Name_Global,
            beneficiaryName: ssn.MFA_Award_Beneficiary_Name_Global,
            nationalIdType: ssn.MFA_Award_National_ID_Type_Global,
            nationalIdNumber: ssn.MFA_Award_National_ID_Global,
            status: awardStatus,
          };  
        }

        updateMfaAwardUrl = beis_url_publishing + "/mfa/award/update/" + ssn.mfaAwardDetails.mfaAwardNumber;

        try {
          const apidata = await axios.put(
            updateMfaAwardUrl,
            updateMfaAwardRequest,
            ssn.UserPrincileObjectGlobal
          );

          API_response_code = `${apidata.status}`;

          ssn.MFA_Grouping_Number_Global = apidata.data;

          res.render("mfa/mfaawardpublished", {
            ssn,
            button_value,
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
  }
});

module.exports = router;
