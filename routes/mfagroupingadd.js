// ********************************************************************
// Gov.UK transparency Add Single Subsidy Award module
// ********************************************************************

const express = require("express");
var session = require("express-session");
const axios = require("axios");
const router = express.Router();
const utils = require("../utils");

router.get("/", async (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined"
  ) {
    res.redirect("/signout");
  } else {
    utils.setSecurityHeaders(res, beis_url_accessmanagement);

    if(!req.get('Referrer').includes("review")){
      ssn.MFA_Grouping_Number_Global = "";
      ssn.MFA_Grouping_Name_Global = "";
      ssn.Granting_Authority_Name_Global = "";
    }

    ssn.Granting_Authority_Name_Error = false;
    ssn.Granting_Authority_Exists_Error = false;
    ssn.Granting_Authority_Name_Inactive_Error = false;
    ssn.Granting_Authority_Multiple_Error = false;

    ssn.MFA_Grouping_Name_Error = false;
    ssn.MFA_Grouping_Name_Length_Error = false;

    ssn.MFAGroupingErrors = [];
    isCallFromEditGrouping = false;
    addOrEdit = "Add";

    req.query = JSON.parse(JSON.stringify(req.query));
    if (req.baseUrl.includes("mfagroupingedit")){
      if(!req.query.hasOwnProperty("id")){
        res.render("bulkupload/notAvailable");
      }else{
        isCallFromEditGrouping = true;
        addOrEdit = "Edit";
        ssn.MFA_Grouping_Number_Global = req.query.id;

        var mfaGroupingEndpoint = beis_url_publishing + "/mfa/grouping/" + ssn.MFA_Grouping_Number_Global;

        try {
          const apiData = await axios.get(
            mfaGroupingEndpoint,
            ssn.UserPrincileObjectGlobal
          );

          ssn.mfaGroupingDetails = apiData.data;

          ssn.MFA_Grouping_Number_Global = ssn.mfaGroupingDetails.mfaGroupingNumber;
          ssn.MFA_Grouping_Name_Global = ssn.mfaGroupingDetails.mfaGroupingName;
          ssn.Granting_Authority_Name_Global = ssn.mfaGroupingDetails.grantingAuthorityName;
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

    res.render("mfa/mfagroupingadd", {
      ssn,
      isCallFromEditGrouping,
      addOrEdit
    });
  }
});

module.exports = router;
