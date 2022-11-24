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
    ssn.MFA_Grouping_Count_Error = false;
    ssn.MFA_Grouping_GA_Error = false;
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
    ssn.MFA_Grouping_Name_Global = "NA";    
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
          "You must enter a public authority name";
        ssn.MFAFocus[Additem] = "#Granting_Authority_Name";
        Additem = Additem + 1;
      }

      if (!organisationName) {
        ssn.MFA_Award_Beneficiary_Name_Error = true;
        ssn.MFAAwardErrors[Additem] =
          "You must enter a public authority name";
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

      var confirmationDateMonthName = monthArray[((parseInt(mfa_award_confirmation_month)) - 1)];;

      ssn.MFA_Award_Confirmation_Date_String_Global = mfa_award_confirmation_day + " " + confirmationDateMonthName + " " + mfa_award_confirmation_year;

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
        /**
         * Granting authority validation start
         */
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
              "Public authority' " + ssn.Granting_Authority_Name_Global.trim() + " 'doesn't exist.";
            ssn.MFAFocus[Additem] = "#Granting_Authority_Name";
            Additem = Additem + 1;
          }else if(gaFiltered.length > 1){
            ssn.Granting_Authority_Multiple_Error = true;
            ssn.MFAAwardErrors[Additem] =
              "Multiple results for public authority '" + ssn.Granting_Authority_Name_Global.trim() + "'. Please be more specific.";
            ssn.MFAFocus[Additem] = "#Granting_Authority_Name";
            Additem = Additem + 1;
          }else if(gaFiltered[0].status == 'Inactive' || gaFiltered[0].status == null){
            ssn.Granting_Authority_Inactive_Error = true;
            ssn.MFAAwardErrors[Additem] =
              "Public authority '" + ssn.Granting_Authority_Name_Global.trim() + "' is inactive.";
            ssn.MFAFocus[Additem] = "#Granting_Authority_Name";
            Additem = Additem + 1;
          }

        /**
         * Granting authority validation end
         */

        /**
         * MFA grouping validation start
         */

        //TODO Test on other user types

        if(ssn.MFA_Yes_No_Global.toLowerCase() == 'yes'){
          mfaGroupingData = {
            searchName: ssn.MFA_Grouping_ID_Global.trim(),
            grantingAuthorityName: ssn.Granting_Authority_Name_Global.trim(),
            pageNumber: 1,
            totalRecordsPerPage: 9000,
          };

          const apidata = await axios.post(
            beis_url_publishing + "/mfa/grouping/search",
            mfaGroupingData,
            ssn.UserPrincileObjectGlobal
          );

          var mfaGroupings = apidata.data.mfaGroupings;

          var mfaGroupingsFiltered = mfaGroupings.filter(item => item.mfaGroupingNumber === ssn.MFA_Grouping_ID_Global.trim());

          if(mfaGroupingsFiltered.length == 0){
            ssn.MFA_Grouping_Exist_Error = true;
            ssn.MFAAwardErrors[Additem] =
              "MFA / SPEIA Grouping '" + ssn.MFA_Grouping_ID_Global.trim() + "' does not exist.";
            ssn.MFAFocus[Additem] = "#MFA_Grouping_ID";
            Additem = Additem + 1;
          }else if (mfaGroupingsFiltered.length > 1){
            // this shouldn't happen as we're filtering the results on the Grouping ID.
            ssn.MFA_Grouping_Count_Error = true;
            ssn.MFAAwardErrors[Additem] =
              "Too many MFA / SPEIA Groupings returned for ID '" + ssn.MFA_Grouping_ID_Global.trim() + "'. Total returned '" + mfaGroupingsFiltered.length + "'. Please raise an incident.";
            ssn.MFAFocus[Additem] = "#MFA_Grouping_ID";
            Additem = Additem + 1;
            console.error("ERROR: Too many MFA / SPEIA Groupings returned for ID '" + ssn.MFA_Grouping_ID_Global.trim() + "'. Total returned '" + mfaGroupingsFiltered.length + "'. Please raise an incident.")
          } else {
            mfaGrouping = mfaGroupingsFiltered[0];
            // everything is ok check the GA
            if(mfaGrouping.grantingAuthorityName != ssn.Granting_Authority_Name_Global.trim()){
              ssn.MFA_Grouping_GA_Error = true;
              ssn.MFAAwardErrors[Additem] =
                "MFA / SPEIA Grouping '" + ssn.MFA_Grouping_ID_Global.trim() + "' does not belong to public authority " + ssn.Granting_Authority_Name_Global.trim();
              ssn.MFAFocus[Additem] = "#MFA_Grouping_ID";
              Additem = Additem + 1;
            }

            if(mfaGrouping.status.toLowerCase() != 'active'){
              ssn.MFA_Grouping_Active_Error = true;
              ssn.MFAAwardErrors[Additem] =
                "MFA / SPEIA Grouping '" + ssn.MFA_Grouping_ID_Global.trim() + "' is not active.";
              ssn.MFAFocus[Additem] = "#MFA_Grouping_ID";
              Additem = Additem + 1;
            }

            if(!ssn.MFA_Grouping_GA_Error && !ssn.MFA_Grouping_Active_Error){
              ssn.MFA_Grouping_Name_Global = mfaGrouping.mfaGroupingName;
            }
          }
        }

         

        /**
         * MFA grouping validation end
         */

          if (
            ssn.Granting_Authority_Exists_Error ||
            ssn.Granting_Authority_Multiple_Error ||
            ssn.Granting_Authority_Inactive_Error ||
            ssn.MFA_Grouping_Exist_Error ||
            ssn.MFA_Grouping_Active_Error ||
            ssn.MFA_Grouping_Count_Error ||
            ssn.MFA_Grouping_GA_Error
            ) {
            res.render("mfa/mfaawardadd", {
              ssn,
            });
          } else {
            if(typeof mfaGroupingYesNo !== "undefined"){
              if(mfaGroupingYesNo.toLowerCase() != 'yes'){
                ssn.MFA_Grouping_ID_Global = "NA";
              }
            }
            res.render("mfa/mfaawardreviewdetail", {
              ssn,
            });
          }
        } catch (err) {
          if (err.toString().includes("404")) {
            if(err.request.path.includes("grouping")){
              ssn.MFA_Grouping_Exist_Error = true;
              ssn.MFAAwardErrors[Additem] =
                "MFA / SPEIA Grouping '" + ssn.MFA_Grouping_ID_Global.trim() + "' does not exist.";
              ssn.MFAFocus[Additem] = "#MFA_Grouping_ID";
              Additem = Additem + 1;
            }else{
              ssn.Granting_Authority_Exists_Error = true;
              ssn.MFAAwardErrors[Additem] =
                "Public authority '" + ssn.Granting_Authority_Name_Global.trim() + "' doesn't exist.";
              ssn.MFAFocus[Additem] = "#Granting_Authority_Name";
              Additem = Additem + 1;
            }
            
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
