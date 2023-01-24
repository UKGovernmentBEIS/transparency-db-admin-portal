// ********************************************************************
// Gov.UK transparency admin progtam review details module
// ********************************************************************

const express = require("express");
var session = require("express-session");
const axios = require("axios");
const { ajaxTransport } = require("jquery");
const router = express.Router();
var utils = require("../utils");

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

    ssn.errors = [];
    ssn.focus = [];
    Additem = 0;

    ssn.Granting_Authority_Name_Error = false;
    ssn.Granting_Authority_Exists_Error = false;
    ssn.Granting_Authority_Inactive_Error = false;
    ssn.Granting_Authority_Multiple_Error = false;

    ssn.Admin_Program_Name_Error = false;
    ssn.Admin_ProgramName_Length_Error = false;
    ssn.Subsidy_Control_Number_Error = false;
    ssn.Subsidy_Control_Inactive_Error = false;
    ssn.Subsidy_Control_Exists_Error = false;
    ssn.Category_Error = false;
  

    var {
      Subsidy_Control_Number,
      Admin_Program_Name,
      Granting_Authority_Name,
      Admin_Program_Budget,
      buttonvalue,
    } = req.body;

    ssn.Subsidy_Measure_Title_Global = "";
    ssn.Subsidy_Control_Number_Global = Subsidy_Control_Number.trim();
    ssn.Admin_Program_Name_Global = Admin_Program_Name.trim();
    ssn.Admin_Program_Budget_Global = Admin_Program_Budget.trim();

    if (ssn.dashboard_roles == "BEIS Administrator") {
      ssn.Granting_Authority_Name_Global = Granting_Authority_Name.trim();
    } else {
      ssn.Granting_Authority_Name_Global = ssn.dashboard_ga_name;
      Granting_Authority_Name = ssn.dashboard_ga_name;
    }

    if (buttonvalue.toLowerCase() == "continue") {
      //Empty field validations
      if (!Subsidy_Control_Number) {
        ssn.Subsidy_Control_Number_Error = true;
        ssn.errors[Additem] =
          "You must enter a subsidy control number";
        ssn.focus[Additem] = "#Subsidy_Control_Number";
        Additem = Additem + 1;
      }

      if (!Granting_Authority_Name) {
        ssn.Granting_Authority_Name_Error = true;
        ssn.errors[Additem] =
          "You must enter a public authority name";
        ssn.focus[Additem] = "#Granting_Authority_Name";
        Additem = Additem + 1;
      }

      if (!Admin_Program_Name) {
        ssn.Admin_Program_Name_Error = true;
        ssn.errors[Additem] =
          "You must enter an admin program name";
        ssn.focus[Additem] = "#Admin_Program_Name";
        Additem = Additem + 1;
      }

      if (Admin_Program_Name != "" && Admin_Program_Name.length > 255) {
        ssn.Admin_Program_Name_Length_Error = true;
        ssn.errors[Additem] =
          "The admin program name must be no longer than 255 characters.";
        ssn.focus[Additem] = "#Admin_Program_Name";
        Additem = Additem + 1;
      }

      if(!Admin_Program_Budget){
        ssn.Budget_Error = true;
        ssn.errors[Additem] =
          "You must provide a budget for the admin program";
        ssn.focus[Additem] = "#Admin_Program_Budget";
        Additem = Additem + 1;
      }
      if (
        ssn.Granting_Authority_Name_Error ||
        ssn.Admin_Program_Name_Error ||
        ssn.Admin_ProgramName_Length_Error ||
        ssn.Route_Name_Error ||
        ssn.Route_Name_Length_Error ||
        ssn.Subsidy_Control_Number_Error ||
        ssn.Subsidy_Control_Inactive_Error ||
        ssn.Subsidy_Control_Exists_Error ||
        ssn.Category_Error
      ) {
        res.render("admin-program/adminprogramadd", {
          ssn,
        });
      } else {
        ssn.Admin_Program_Budget_Formatted_Global = utils.formatCurrency(ssn.Admin_Program_Budget_Global);

        let gaResponse;
        let gaRequest = {
          grantingAuthorityName: ssn.Granting_Authority_Name_Global.trim(),
          pageNumber: 1,
          totalRecordsPerPage: 9000,
        };
        try {
          gaResponse = await axios.post(
            beis_url_searchscheme + "/searchGrantingAuthority",
            gaRequest,
            ssn.UserPrincileObjectGlobal
          );

          } catch (err) {
            if (err.toString().includes("404")) {
              ssn.Granting_Authority_Exists_Error = true;
              ssn.errors[Additem] =
                "Public authority '" + ssn.Granting_Authority_Name_Global.trim() + "' doesn't exist.";
              ssn.focus[Additem] = "#Granting_Authority_Name";
              Additem = Additem + 1;
              res.render("admin-program/adminprogramadd", {
                ssn,
              });
            }
            console.log("error in scheme", err);
            return false;
          }

          var gaList = gaResponse.data.gaList;

          var gaFiltered = gaList.filter(item => item.grantingAuthorityName.toLowerCase() === ssn.Granting_Authority_Name_Global.trim().toLowerCase())

          if (gaFiltered.length == 0) {
            ssn.Granting_Authority_Exists_Error = true;
            ssn.errors[Additem] =
              "Public authority' " + ssn.Granting_Authority_Name_Global.trim() + " 'doesn't exist.";
            ssn.focus[Additem] = "#Granting_Authority_Name";
            Additem = Additem + 1;
          }else if(gaFiltered.length > 1){
            ssn.Granting_Authority_Multiple_Error = true;
            ssn.errors[Additem] =
              "Multiple results for public authority '" + ssn.Granting_Authority_Name_Global.trim() + "'. Please be more specific.";
            ssn.focus[Additem] = "#Granting_Authority_Name";
            Additem = Additem + 1;
          }else if(gaFiltered[0].status == 'Inactive' || gaFiltered[0].status == null){
            ssn.Granting_Authority_Inactive_Error = true;
            ssn.errors[Additem] =
              "Public authority '" + ssn.Granting_Authority_Name_Global.trim() + "' is inactive.";
            ssn.focus[Additem] = "#Granting_Authority_Name";
            Additem = Additem + 1;
          }

          let subsidyResponse;
          try{
            subsidyResponse = await axios.get(
              beis_url_publicsearch + "/schemes/scheme/" + ssn.Subsidy_Control_Number_Global.trim(),
            );
          }catch(err){
            if (err.toString().includes("404")) {
              ssn.Subsidy_Control_Exists_Error = true;
              ssn.errors[Additem] =
                "Subsidy scheme '" + ssn.Subsidy_Control_Number_Global.trim() + "' doesn't exist.";
              ssn.focus[Additem] = "#Subsidy_Control_Number";
              Additem = Additem + 1;
              res.render("admin-program/adminprogramadd", {
                ssn,
              });
            }
            console.log("error in scheme", err);
            return false;
          }

          var scheme = subsidyResponse.data;

          if(scheme.status != 'Active' || scheme.status == null){
            ssn.Subsidy_Control_Inactive_Error = true;
            ssn.errors[Additem] =
              "Subsidy scheme '" + ssn.Subsidy_Control_Number_Global.trim() + "' is not active.";
            ssn.focus[Additem] = "#Subsidy_Control_Number";
            Additem = Additem + 1;
          }else{
            ssn.Subsidy_Measure_Title_Global = scheme.subsidyMeasureTitle;
          }

          if (
            ssn.Granting_Authority_Exists_Error ||
            ssn.Granting_Authority_Multiple_Error ||
            ssn.Granting_Authority_Inactive_Error ||
            ssn.Subsidy_Control_Inactive_Error
            ) {
            res.render("admin-program/adminprogramadd", {
              ssn,
            });
          } else {
            res.render("admin-program/adminprogramreviewdetail", {
              ssn,
            });
          }
      }
    } else {
      res.render("admin-program/adminprogramcancel");
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

    res.render("admin-program/adminprogramreviewdetail");
  }
});

module.exports = router;
