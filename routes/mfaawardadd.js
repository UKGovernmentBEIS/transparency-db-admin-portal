// ********************************************************************
// Gov.UK transparency Add Single Subsidy Award module
// ********************************************************************

const express = require("express");
var session = require("express-session");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined"
  ) {
    res.redirect("/signout");
  } else {

    ssn.MFA_Award_Number_Global = "";
    ssn.SPEI_Global = "";
    ssn.MFA_Yes_No_Global = "";
    ssn.MFA_Grouping_ID_Global = "";
    ssn.Award_Full_Amount_Global = ""
    ssn.MFA_Award_Confirmation_Day_Global = "";
    ssn.MFA_Award_Confirmation_Month_Global = "";
    ssn.MFA_Award_Confirmation_Year_Global = "";
    ssn.Granting_Authority_Name_Global = "";
    ssn.MFA_Award_Beneficiary_Name_Global = "";
    ssn.MFA_Award_National_ID_Type_Global = "";
    ssn.MFA_Award_National_ID_Global = "";
    

    ssn.Granting_Authority_Name_Error = false;
    ssn.Granting_Authority_Exists_Error = false;
    ssn.Granting_Authority_Name_Inactive_Error = false;
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
    ssn.MFA_Award_National_ID_Type_Error = false;
    ssn.MFA_Award_National_ID_Error = false;
    ssn.MFA_Award_Confirmation_Day_Error = false;
    ssn.MFA_Award_Confirmation_Month_Error = false;
    ssn.MFA_Award_Confirmation_Year_Error = false;

    ssn.MFAAwardErrors = [];
    isCallFromEditAward = false;
    addOrEdit = "Add";

    req.query = JSON.parse(JSON.stringify(req.query));
    if (req.baseUrl.includes("mfaawardedit")){
      if(!req.query.hasOwnProperty("id")){
        res.render("bulkupload/notAvailable");
      }else{
        const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August','September', 'October', 'November', 'December'];
        isCallFromEditAward = true;
        addOrEdit = "Edit";
        ssn.MFA_Award_Number_Global = req.query.id;

        var mfaAwardEndpoint = beis_url_publishing + "/mfa/award/" + ssn.MFA_Award_Number_Global;
  
        try {
          const apiData = await axios.get(
            mfaAwardEndpoint,
            ssn.UserPrincileObjectGlobal
          );
    
          ssn.mfaAwardDetails = apiData.data;

          var dateArray = ssn.mfaAwardDetails.confirmationDate.split(" ");

          var month = dateArray.indexOf(dateArray[1]).toString();

          if(month.length == 1){
            month = "0" + month;
          }
          

          ssn.MFA_Award_Number_Global = ssn.mfaAwardDetails.mfaAwardNumber;
          ssn.Granting_Authority_Name_Global = ssn.mfaAwardDetails.grantingAuthorityName;
          ssn.SPEI_Global = ssn.mfaAwardDetails.isSpeiAssistance;
          ssn.MFA_Yes_No_Global = ssn.mfaAwardDetails.hasMfaGrouping ? "Yes" : "No";
          ssn.MFA_Grouping_ID_Global = ssn.mfaAwardDetails.mfaGroupingNumber;
          ssn.Award_Full_Amount_Global = ssn.mfaAwardDetails.awardAmount;
          ssn.MFA_Award_Confirmation_Day_Global = dateArray[0];
          ssn.MFA_Award_Confirmation_Month_Global = month;
          ssn.MFA_Award_Confirmation_Year_Global = dateArray[2];
          ssn.MFA_Award_Beneficiary_Name_Global = ssn.mfaAwardDetails.recipientName;
          ssn.MFA_Award_National_ID_Type_Global = ssn.mfaAwardDetails.recipientIdType;
          ssn.MFA_Award_National_ID_Global = ssn.mfaAwardDetails.recipientIdNumber;


        } catch (err) {
          const status = err.response.status;
          console.error("ERROR: " + err.message);
    
          var render = "bulkupload/notAvailable";
          switch(status){
            case 500:
              break;
            case 401:
            case 403:
              render = "bulkupload/notAuthorized"
              break;
          }
          res.render(render);
        } 
      }
    }

    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

    res.render("mfa/mfaawardadd", { 
      ssn,
      isCallFromEditAward,
      addOrEdit
    });
  }
});

module.exports = router;
