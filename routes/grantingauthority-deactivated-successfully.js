const express = require("express");
const axios = require("axios");
var session = require("express-session");
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
    res.set("Access-Control-Allow-Origin", beis_url_searchscheme);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    try {
      gaId = req.body.gaid;
      var azGrpId = req.body.azGrpId.toString();
      var users = [];

      console.log(azGrpId);
      if (ssn.GaListArr_Global.length > 0) {
        ssn.GaListArr_Global.forEach(function (ids) {
          users.push(ids.gaId.toString().trim());
        });
      } else users = [];
      console.log("body", users);
      console.log("ssn.UserPrincileObjectGlobal", ssn.UserPrincileObjectGlobal);
      console.log(
        "Invoking delete method",
        beis_url_searchscheme + "/group/" + azGrpId
      );
      var data = {
        userIds: users,
      };
      UserPrincileObjectGlobal =
        '{"userName":"' +
        ssn.dashboard_user_name +
        '","password":"password123",' +
        '"role":"' +
        ssn.dashboard_roles +
        '","grantingAuthorityGroupId":"' +
        ssn.dashbaord_ga_ID +
        '","grantingAuthorityGroupName":"' +
        ssn.dashboard_ga_name +
        '"}';
      // await axios
      //   .delete(beis_url_searchscheme + "/group/" + azGrpId, {
      //     headers: {
      //       userPrinciple: UserPrincileObjectGlobal,
      //     },
      //     data: {
      //       userIds: users,
      //     },
      //   })
      //   .then(function (response) {
      //     console.log("BODY", response.data.gaId);
      //     gaid = response.data.gaId;
      //     res.render("bulkupload/grantingauthority-deactivated-successfully",{gaid});
      //   });
      const apidata = await axios.delete(
        beis_url_searchscheme + "/group/" + azGrpId,
        {
          data,
          headers: {
            userPrinciple: UserPrincileObjectGlobal,
          },
        }
      );
      console.log("BODY", apidata.data.gaId);
      var gaid = apidata.data.gaId;
      res.render("bulkupload/grantingauthority-deactivated-successfully", {
        gaid,
      });
    } catch (err) {
      console.log("message error deactivate GA : " + err);
      if (err.toString().includes("500")) res.render("bulkupload/notAvailable");
      else if (err.toString().includes("401"))
        res.render("bulkupload/notAuthorized");
    }
  }
});

module.exports = router;
