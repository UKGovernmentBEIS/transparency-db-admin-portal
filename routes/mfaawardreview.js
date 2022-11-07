// ********************************************************************
// Gov.UK transparency subsidy award review details module
// ********************************************************************

const express = require("express");
var session = require("express-session");
const axios = require("axios");
const { ajaxTransport } = require("jquery");
const router = express.Router();

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

    const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August','September', 'October', 'November', 'December'];

    ssn.MFAAwardErrors = [];
    ssn.MFAFocus = [];
    Additem = 0;

    ssn.Granting_Authority_Name_Error = false;
    ssn.Granting_Authority_Exists_Error = false;
    ssn.Granting_Authority_Inactive_Error = false;
    ssn.Granting_Authority_Multiple_Error = false;

    ssn.SPEI_Error = false;
    ssn.MFA_Grouping_YesNo_Error = false;
    ssn.MFA_Grouping_Error = false;
    ssn.MFA_Grouping_Empty_Error = false;
    ssn.MFA_Grouping_Exist_Error = false;
    ssn.MFA_Grouping_Active_Error = false;
    ssn.MFA_Award_Amount_Error = false;
    ssn.MFA_Award_Beneficiary_Name_Error = false;
    ssn.MFA_Award_Beneficiary_Name_Length_Error = false;
    ssn.MFA_Award_National_ID_Type_Error = false;
    ssn.MFA_Award_National_ID_Error = false;
    ssn.MFA_Award_Confirmation_Day_Error = false;
    ssn.MFA_Award_Confirmation_Month_Error = false;
    ssn.MFA_Award_Confirmation_Year_Error = false;

    var {
      speiAssistance,
      mfaGroupingYesNo,
      mfaGroupingId,
      awardFullAmount,
      mfa_award_confirmation_day,
      mfa_award_confirmation_month,
      mfa_award_confirmation_year,
      Granting_Authority_Name,
      organisationName,
      National_ID_Type,
      National_ID_Number,
      buttonvalue
    } = req.body;

    if (ssn.dashboard_roles == "BEIS Administrator") {
      ssn.Granting_Authority_Name_Global = Granting_Authority_Name;
    } else {
      ssn.Granting_Authority_Name_Global = ssn.dashboard_ga_name;
      Granting_Authority_Name = ssn.dashboard_ga_name;
    }

    ssn.SPEI_Global = speiAssistance;
    ssn.MFA_Yes_No_Global = mfaGroupingYesNo;
    ssn.MFA_Grouping_ID_Global = mfaGroupingId;
    ssn.Award_Full_Amount_Global = awardFullAmount;
    ssn.MFA_Award_Confirmation_Day_Global = mfa_award_confirmation_day;
    ssn.MFA_Award_Confirmation_Month_Global = mfa_award_confirmation_month;
    ssn.MFA_Award_Confirmation_Year_Global = mfa_award_confirmation_year;
    ssn.MFA_Award_Beneficiary_Name_Global = organisationName;
    ssn.MFA_Award_National_ID_Type_Global = National_ID_Type;
    ssn.MFA_Award_National_ID_Global = National_ID_Number;

    if (buttonvalue.toLowerCase() == "continue") {
      //Empty field validations

      if (!speiAssistance) {
        ssn.SPEI_Error = true;
        ssn.MFAAwardErrors[Additem] =
          "You must select the SPEI Assiatance status";
        ssn.MFAFocus[Additem] = "#SPEI";
        Additem = Additem + 1;
      }

      if (!mfaGroupingYesNo) {
        ssn.MFA_Grouping_YesNo_Error = true;
        ssn.MFAAwardErrors[Additem] =
          "You must indicate if you wish to add this award to an MFA Grouping";
        ssn.MFAFocus[Additem] = "#MFA_Grouping_YesNo";
        Additem = Additem + 1;
      }

      if (!mfaGroupingId && (mfaGroupingYesNo != "" && mfaGroupingYesNo != "No")) {
        ssn.MFA_Grouping_Error = true;
        ssn.MFA_Grouping_Empty_Error = true;
        ssn.MFAAwardErrors[Additem] =
          "You must provide an MFA Grouping ID";
        ssn.MFAFocus[Additem] = "#MFA_Grouping_ID";
        Additem = Additem + 1;
      }

      if (!awardFullAmount) {
        ssn.MFA_Award_Amount_Error = true;
        ssn.MFAAwardErrors[Additem] =
          "You must provide an award amount";
        ssn.MFAFocus[Additem] = "#Award_Full_Amount";
        Additem = Additem + 1;
      }

      /**
       *  Confirmation date validation START
       */
      if (!mfa_award_confirmation_day) {
        ssn.MFA_Award_Confirmation_Day_Error = true;
        ssn.MFAAwardErrors[Additem] = "Enter the confirmation day of the date";
        ssn.MFAFocus[Additem] = "#mfa_award_confirmation_day";
        Additem = Additem + 1;
      }
      if (!mfa_award_confirmation_month) {
        ssn.MFA_Award_Confirmation_Month_Error = true;
        ssn.MFAAwardErrors[Additem] = "Enter the confirmation month of the date";
        ssn.MFAFocus[Additem] = "#mfa_award_confirmation_month";
        Additem = Additem + 1;
      }
      if (mfa_award_confirmation_month != "") {
        if (mfa_award_confirmation_month > 12 || mfa_award_confirmation_month == 0) {
          ssn.MFA_Award_Confirmation_Month_Error = true;
          ssn.MFAAwardErrors[Additem] = "Enter the confirmation month from 1 to 12";
          ssn.MFAFocus[Additem] = "#mfa_award_confirmation_month";
          Additem = Additem + 1;
        }
      }
      if (!mfa_award_confirmation_year) {
        ssn.MFA_Award_Confirmation_Year_Error = true;
        ssn.MFAAwardErrors[Additem] = "Enter the confirmation year of the date";
        ssn.MFAFocus[Additem] = "#mfa_award_confirmation_year";
        Additem = Additem + 1;
      }
      if (mfa_award_confirmation_day != "") {
        // day validation starts here

        if (mfa_award_confirmation_day > 31 || mfa_award_confirmation_day < 1) {
          ssn.MFA_Award_Confirmation_Day_Error = true;
          ssn.MFAAwardErrors[Additem] = "Enter the valid legal confirmation day of the date";
          ssn.MFAFocus[Additem] = "#mfa_award_confirmation_day";
          Additem = Additem + 1;
        }

        if (
          mfa_award_confirmation_day == 31 &&
          (mfa_award_confirmation_month == parseInt("02") ||
          mfa_award_confirmation_month == parseInt("04") ||
          mfa_award_confirmation_month == parseInt("06") ||
          mfa_award_confirmation_month == parseInt("09") ||
          mfa_award_confirmation_month == 11)
        ) {
          ssn.MFA_Award_Confirmation_Day_Error = true;
          ssn.MFAAwardErrors[Additem] = "Enter the valid day";
          ssn.MFAFocus[Additem] = "#mfa_award_confirmation_day";
          Additem = Additem + 1;
        }

        if (
          mfa_award_confirmation_day == 29 &&
          mfa_award_confirmation_month == parseInt("02")
        ) {
          if (
            (mfa_award_confirmation_year % 4 == 0 &&
              mfa_award_confirmation_year % 100 != 0) ||
              mfa_award_confirmation_year % 400 == 0
          ) {
          } else {
            ssn.MFA_Award_Confirmation_Day_Error = true;
            ssn.MFAAwardErrors[Additem] = "Enter the valid day";
            ssn.MFAFocus[Additem] = "#mfa_award_confirmation_day";
            Additem = Additem + 1;
          }
        }

        if (
          mfa_award_confirmation_day == 30 &&
          mfa_award_confirmation_month == parseInt("02")
        ) {
          ssn.MFA_Award_Confirmation_Day_Error = true;
          ssn.MFAAwardErrors[Additem] = "Enter the valid day";
          ssn.MFAFocus[Additem] = "#mfa_award_confirmation_day";
          Additem = Additem + 1;
        }
      }
      /**
       *  Confirmation date validation END
       */

      if (!Granting_Authority_Name) {
        ssn.Granting_Authority_Name_Error = true;
        ssn.MFAAwardErrors[Additem] =
          "You must enter a granting authority name";
        ssn.MFAFocus[Additem] = "#Granting_Authority_Name";
        Additem = Additem + 1;
      }

      if (!organisationName) {
        ssn.MFA_Award_Beneficiary_Name_Error = true;
        ssn.MFAAwardErrors[Additem] =
          "You must enter a granting authority name";
        ssn.MFAFocus[Additem] = "#Beneficiary_Name";
        Additem = Additem + 1;
      }
      
      if (organisationName != "" && organisationName.length > 255) {
        ssn.MFA_Award_Beneficiary_Name_Length_Error = true;
        ssn.MFAAwardErrors[Additem] =
          "Organisation cannot be greatere than 255 characters";
        ssn.MFAFocus[Additem] = "#Beneficiary_Name";
        Additem = Additem + 1;
      }

      if (!National_ID_Type) {
        ssn.MFA_Award_National_ID_Type_Error = true;
        ssn.MFAAwardErrors[Additem] =
          "You must select an ID type for the recipient organisation.";
        ssn.MFAFocus[Additem] = "#National_ID_Type";
        Additem = Additem + 1;
      }
      if (!National_ID_Number) {
        ssn.MFA_Award_National_ID_Error = true;
        ssn.MFAAwardErrors[Additem] =
          "You must enter an ID for the recipient organisation.";
        ssn.MFAFocus[Additem] = "#National_ID_Number";
        Additem = Additem + 1;
      }

      if (
        ssn.Granting_Authority_Name_Error ||
        ssn.SPEI_Error ||
        ssn.MFA_Grouping_YesNo_Error ||
        ssn.MFA_Grouping_Error ||
        ssn.MFA_Grouping_Empty_Error ||
        ssn.MFA_Grouping_Exist_Error ||
        ssn.MFA_Grouping_Active_Error ||
        ssn.MFA_Award_Amount_Error ||
        ssn.MFA_Award_Beneficiary_Name_Error ||
        ssn.MFA_Award_Beneficiary_Name_Length_Error ||
        ssn.MFA_Award_National_ID_Type_Error ||
        ssn.MFA_Award_National_ID_Error ||
        ssn.MFA_Award_Confirmation_Day_Error ||
        ssn.MFA_Award_Confirmation_Month_Error ||
        ssn.MFA_Award_Confirmation_Year_Error
      ) {
        res.render("mfa/mfaawardadd", {
          ssn,
        });
      } else {
        data = {
          grantingAuthorityName: ssn.Granting_Authority_Name_Global.trim(),
          pageNumber: 1,
          totalRecordsPerPage: 9000,
        };

        try {
          const apidata = await axios.post(
            beis_url_searchscheme + "/searchGrantingAuthority",
            data,
            ssn.UserPrincileObjectGlobal
          );

          var gaList = apidata.data.gaList;

          var gaFiltered = gaList.filter(item => item.grantingAuthorityName.toLowerCase() === ssn.Granting_Authority_Name_Global.trim().toLowerCase())

          if (gaFiltered.length == 0) {
            ssn.Granting_Authority_Exists_Error = true;
            ssn.MFAAwardErrors[Additem] =
              "Granting authority' " + ssn.Granting_Authority_Name_Global.trim() + " 'doesn't exist.";
            ssn.MFAFocus[Additem] = "#Granting_Authority_Name";
            Additem = Additem + 1;
          }else if(gaFiltered.length > 1){
            ssn.Granting_Authority_Multiple_Error = true;
            ssn.MFAAwardErrors[Additem] =
              "Multiple results for granting authority '" + ssn.Granting_Authority_Name_Global.trim() + "'. Please be more specific.";
            ssn.MFAFocus[Additem] = "#Granting_Authority_Name";
            Additem = Additem + 1;
          }else if(gaFiltered[0].status == 'Inactive' || gaFiltered[0].status == null){
            ssn.Granting_Authority_Inactive_Error = true;
            ssn.MFAAwardErrors[Additem] =
              "Granting authority '" + ssn.Granting_Authority_Name_Global.trim() + "' is inactive.";
            ssn.MFAFocus[Additem] = "#Granting_Authority_Name";
            Additem = Additem + 1;
          }

          if (
            ssn.Granting_Authority_Exists_Error ||
            ssn.Granting_Authority_Multiple_Error ||
            ssn.Granting_Authority_Inactive_Error
            ) {
            res.render("mfa/mfaawardadd", {
              ssn,
            });
          } else {
            res.render("mfa/mfaawardreviewdetail", {
              ssn,
            });
          }
        } catch (err) {
          if (err.toString().includes("404")) {
            ssn.Granting_Authority_Exists_Error = true;
            ssn.MFAAwardErrors[Additem] =
              "Granting authority '" + ssn.Granting_Authority_Name_Global.trim() + "' doesn't exist.";
            ssn.MFAFocus[Additem] = "#Granting_Authority_Name";
            Additem = Additem + 1;
            res.render("mfa/mfaawardadd", {
              ssn,
            });
          }
          console.log("error in mfa award", err);
        }
      }
    } else {
      res.render("mfa/mfaawardcancel");
    }
  }
});

router.get("/", (req, res) => {
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

    res.render("mfa/mfaawardreviewdetail");
  }
});

module.exports = router;
