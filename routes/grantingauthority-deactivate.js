const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
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
        `http://dev-beis-tp-db-ga-schemes-service.azurewebsites.net/grantingAuthority/${azGrpId}`
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
      GaListArr_Global = gaListArr;
      res.render("bulkupload/grantingauthority-deactivate", {
        gaid,
        ganame,
        GaListArr_Global,
        azGrpId,
      });
    } catch (err) {
      console.log("message error deactivate GA : " + err);
      // res.render("publicusersearch/noresults");
    }
  } catch (err) {
    console.log("Error while fetching GA user List", err);
  }
});

module.exports = router;
