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
    if (!req.get('Referrer').includes("review")) {
      ssn.Admin_Program_Number_Global = "";
      ssn.Admin_Program_Name_Global = "";
      ssn.Granting_Authority_Name_Global = "";
      ssn.Subsidy_Control_Number_Global = "";
      ssn.Admin_Program_Budget_Global = "";
      ssn.Admin_Program_Budget_Formatted_Global = "";
    }

    // Errors Start
    ssn.Granting_Authority_Name_Error = false;
    ssn.Granting_Authority_Exists_Error = false;
    ssn.Granting_Authority_Inactive_Error = false;
    ssn.Granting_Authority_Multiple_Error = false;
    ssn.Admin_Program_Name_Error = false;
    ssn.Admin_ProgramName_Length_Error = false;
    ssn.Route_Name_Error = false;
    ssn.Route_Name_Length_Error = false;
    ssn.Subsidy_Control_Number_Error = false;
    ssn.Subsidy_Control_Inactive_Error = false;
    ssn.Subsidy_Control_Exists_Error = false;
    ssn.Category_Error = false;

    ssn.errors = [];
    isCallFromEdit = false;
    addOrEdit = "Add";

    req.query = JSON.parse(JSON.stringify(req.query));
    if (req.baseUrl.includes("adminprogramedit")){
      if(!req.query.hasOwnProperty("id")){
        res.render("bulkupload/notAvailable");
      }else{
        isCallFromEdit = true;
        addOrEdit = "Edit";
        ssn.Admin_Program_Number_Global = req.query.id;

        var endpoint = beis_url_searchscheme + "/adminprogram/" + ssn.Admin_Program_Number_Global;
  
        try {
          const apiData = await axios.get(
            endpoint,
            ssn.UserPrincileObjectGlobal
          );
    
          ssn.adminProgramDetails = apiData.data;  

          ssn.Admin_Program_Number_Global = ssn.adminProgramDetails.adminProgramNumber;
          ssn.Admin_Program_Name_Global = ssn.adminProgramDetails.adminProgramName;
          ssn.Granting_Authority_Name_Global = ssn.adminProgramDetails.grantingAuthorityName;
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

    res.render("admin-program/adminprogramadd", { 
      ssn,
      isCallFromEdit,
      addOrEdit
    });
  }
});

module.exports = router;
