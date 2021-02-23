const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/", async (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  gaId = req.body.gaid;
  var azGrpId = req.body.azGrpId;
  var userIds = [];
  console.log("azGrpId", azGrpId);
  console.log("req.body.userIds", GaListArr_Global);
  GaListArr_Global.forEach(function (ids) {
    userIds.push(ids.gaId);
  });
  try {
    const apidata = await axios.delete(
      beis_url_accessmanagement + `/group/${azGrpId}`,
      {
        userIds: userIds,
      },
      UserPrincileObjectGlobal
    );
    console.log("Body : ", JSON.stringify(apidata.data));

    res.render("bulkupload/grantingauthority-deactivated-successfully", {
      gaId,
    });
  } catch (err) {
    console.log("message error deactivate GA : " + err);
    // res.render("publicusersearch/noresults");
  }
});

module.exports = router;
