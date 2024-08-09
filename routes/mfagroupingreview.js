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

    ssn.MFAGroupingErrors = [];
    ssn.MFAFocus = [];
    Additem = 0;

    ssn.Granting_Authority_Name_Error = false;
    ssn.Granting_Authority_Exists_Error = false;
    ssn.Granting_Authority_Name_Inactive_Error = false;
    ssn.Granting_Authority_Multiple_Error = false;

    ssn.MFA_Grouping_Name_Error = false;
    ssn.MFA_Grouping_Name_Length_Error = false;

    var {
      MFA_Grouping_Name,
      Granting_Authority_Name,
      buttonvalue,
    } = req.body;

    ssn.MFA_Grouping_Name_Global = MFA_Grouping_Name;

    if (ssn.dashboard_roles == "BEIS Administrator") {
      ssn.Granting_Authority_Name_Global = Granting_Authority_Name;
    } else {
      ssn.Granting_Authority_Name_Global = ssn.dashboard_ga_name;
      Granting_Authority_Name = ssn.dashboard_ga_name;
    }

    if (buttonvalue.toLowerCase() == "continue") {
      //Empty field validations

      if (!MFA_Grouping_Name) {
        ssn.MFA_Grouping_Name_Error = true;
        ssn.MFAGroupingErrors[Additem] =
          "You must enter an MFA grouping name";
        ssn.MFAFocus[Additem] = "#MFA_Grouping_Name";
        Additem = Additem + 1;
      }

      if (MFA_Grouping_Name != "" && MFA_Grouping_Name.length > 255) {
        ssn.MFA_Grouping_Name_Length_Error = true;
        ssn.MFAGroupingErrors[Additem] =
          "The MFA grouping name must be no longer than 255 characters.";
        ssn.MFAFocus[Additem] = "#MFA_Grouping_Name";
        Additem = Additem + 1;
      }

      if (!Granting_Authority_Name) {
        ssn.Granting_Authority_Name_Error = true;
        ssn.MFAGroupingErrors[Additem] =
          "You must enter a public authority name";
        ssn.MFAFocus[Additem] = "#Granting_Authority_Name";
        Additem = Additem + 1;
      }

      if (
        ssn.Granting_Authority_Name_Error ||
        ssn.MFA_Grouping_Name_Error ||
        ssn.MFA_Grouping_Name_Length_Error
      ) {
        res.render("mfa/mfagroupingadd", {
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

          var gaList = apidata.data.responseList;

          var gaFiltered = gaList.filter(item => item.grantingAuthorityName.toLowerCase() === ssn.Granting_Authority_Name_Global.trim().toLowerCase())

          if (gaFiltered.length == 0) {
            ssn.Granting_Authority_Exists_Error = true;
            ssn.MFAGroupingErrors[Additem] =
              "Public authority '" + ssn.Granting_Authority_Name_Global.trim() + "' doesn't exist.";
            ssn.MFAFocus[Additem] = "#Granting_Authority_Name";
            Additem = Additem + 1;
          }else if(gaFiltered.length > 1){
            ssn.Granting_Authority_Multiple_Error = true;
            ssn.MFAGroupingErrors[Additem] =
              "Multiple results for public authority '" + ssn.Granting_Authority_Name_Global.trim() + "'. Please be more specific.";
            ssn.MFAFocus[Additem] = "#Granting_Authority_Name";
            Additem = Additem + 1;
          }else if(gaFiltered[0].status == 'Inactive' || gaFiltered[0].status == null){
            ssn.Granting_Authority_Name_Inactive_Error = true;
            ssn.MFAGroupingErrors[Additem] =
              "Public authority '" + ssn.Granting_Authority_Name_Global.trim() + "' is inactive.";
            ssn.MFAFocus[Additem] = "#Granting_Authority_Name";
            Additem = Additem + 1;
          }

          if (
            ssn.Granting_Authority_Exists_Error ||
            ssn.Granting_Authority_Multiple_Error ||
            ssn.Granting_Authority_Name_Inactive_Error
            ) {
            res.render("mfa/mfagroupingadd", {
              ssn,
            });
          } else {
            res.render("mfa/mfagroupingreviewdetail", {
              ssn,
            });
          }
        } catch (err) {
          if (err.toString().includes("404")) {
            ssn.Granting_Authority_Exists_Error = true;
            ssn.MFAGroupingErrors[Additem] =
              "Public authority '" + ssn.Granting_Authority_Name_Global.trim() + "' doesn't exist.";
            ssn.MFAFocus[Additem] = "#Granting_Authority_Name";
            Additem = Additem + 1;
            res.render("mfa/mfagroupingadd", {
              ssn,
            });
          }
          console.log("error in scheme", err);
        }
      }
    } else {
      res.render("mfa/mfagroupingcancel");
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

    res.render("mfa/mfagroupingreviewdetail");
  }
});

module.exports = router;
