// ********************************************************************
// Gov.UK transparency Subsidy granting authority deactivate module
// ********************************************************************

const express = require("express");
const axios = require("axios");
var session = require("express-session");
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

    // ganame = req.query.gaName;

    try {
      const apiroles = await axios.get(
        beis_url_accessmanagement + "/accessmanagement/allga"
      );

      apiroles.data.forEach(function (obj) {
        if (ssn.gaId == obj.gaId) azGrpId = obj.azGrpId;
      });

      try {
        const apidata = await axios.get(
          beis_url_searchscheme + `/grantingAuthority/${azGrpId}`,
          ssn.UserPrincileObjectGlobal
        );

        var gaListArr = [];
        if (apidata.data.hasOwnProperty("value")) {
          if (apidata.data.value.length > 0) {
            apidata.data.value.forEach(function (gaList) {
              var gaListObj = new Object();
              gaListObj.gaId = gaList.id;
              gaListObj.gaName = gaList.displayName;
              gaListArr.push(gaListObj);
            });
          } else gaListArr = [];
        }
        ssn.GaListArr_Global = gaListArr;
        if (ssn.dashboard_roles == "BEIS Administrator") {
          gaid = ssn.grantingAuthorityID_Global;
          ganame = ssn.grantingAuthorityName_Global;
          checkboxError = false;
          res.render("bulkupload/grantingauthority-deactivate", {
            gaid,
            ganame,
            checkboxError,
            // ssn.GaListArr_Global,
            ssn,
            azGrpId,
          });
        } else {
          res.render("bulkupload/notAuthorized");
        }
      } catch (err) {
        if (err.toString().includes("500"))
          res.render("bulkupload/notAvailable");
        else if(err.toString().includes("403"))
          res.render("bulkupload/notAuthorized");
        console.log("message error deactivate GA : " + err);
        // res.render("publicusersearch/noresults");
      }
    } catch (err) {
      if (err.toString().includes("500")) res.render("bulkupload/notAvailable");
      console.log("Error while fetching GA user List", err);
    }
  }
});

module.exports = router;
