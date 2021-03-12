const express = require("express");
const axios = require("axios");
var session = require("express-session");
const router = express.Router();

router.get("/", async (req, res) => {
  ssn = req.session;
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  gaid = req.query.gaId;
  ganame = req.query.gaName;
  try {
    const apiroles = await axios.get(
      beis_url_accessmanagement + "/accessmanagement/allga"
    );
    console.log(`Status: ${apiroles.status}`);

    console.log("Body: ", apiroles.data);

    apiroles.data.forEach(function (obj) {
      if (gaid == obj.gaId) azGrpId = obj.azGrpId;
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
        res.render("bulkupload/grantingauthority-deactivate", {
          gaid,
          ganame,
          // ssn.GaListArr_Global,
          ssn,
          azGrpId,
        });
      } else {
        res.render("bulkupload/notAuthorized");
      }
    } catch (err) {
      if (err.toString().includes("500")) res.render("bulkupload/notAvailable");
      console.log("message error deactivate GA : " + err);
      // res.render("publicusersearch/noresults");
    }
  } catch (err) {
    if (err.toString().includes("500")) res.render("bulkupload/notAvailable");
    console.log("Error while fetching GA user List", err);
  }
});

module.exports = router;
