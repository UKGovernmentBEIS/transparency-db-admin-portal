const express = require("express");
const axios = require("axios");
var session = require("express-session");
const router = express.Router();

router.post("/", async (req, res) => {
  ssn = req.session;
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_searchscheme);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  gaId = req.body.gaid;
  var azGrpId = req.body.azGrpId.toString();
  var userId = [];

  console.log(azGrpId);
  if (ssn.GaListArr_Global.length > 0) {
    ssn.GaListArr_Global.forEach(function (ids) {
      userId.push(ids.gaId);
    });
  } else userId = [""];
  console.log("body", userId);
  console.log("ssn.UserPrincileObjectGlobal", ssn.UserPrincileObjectGlobal);
  console.log(
    "Invoking delete method",
    beis_url_searchscheme + "/group/" + azGrpId
  );
  try {
    const apidata = await axios.delete(
      beis_url_searchscheme + "/group/" + azGrpId,
      {
        usersGroupRequest: {
          userIds: userId,
        },
      },
      {
        headers: {
          UserPrinciple:
            '{"userName":"devbiesadmintest","password":"password123","role":"BEIS Administrator","grantingAuthorityGroupId":"138","grantingAuthorityGroupName":"Business Energy And Industrial Strategy"}',
        },
      }
    );

    console.log("BODY", apidata);
  } catch (err) {
    console.log("Delete GA error");
    console.log("message error deactivate GA : " + err);
    if (err.toString().includes("500")) res.render("bulkupload/notAvailable");
    else if (err.toString().includes("401"))
      res.render("bulkupload/notAuthorized");
  }
});

module.exports = router;
