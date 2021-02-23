const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/", async (req, res) => {
  // const data = {
  //   name: req.body.GaName,
  // };
  // Environment_variable = process.argv[2];
  // const env = Environment_variable.split("=");

  if (req.body.editReview == "true") {
    // const gaName = req.body.grantingAuthorityName.replace(/ /g, "");
    var gaID = req.body.grantingAuthorityID;
    // var azGroupName = gaName;
    // if (env[1] != "prod") env[1] + "_" + gaName;
    try {
      const apidata = await axios.put(
        beis_url_accessmanagement + `/grantingAuthority/${gaID}`,
        {
          name: req.body.grantingAuthorityName,
          // az_group_name: azGroupName,
        },
        UserPrincileObjectGlobal
      );
      // const gaID = apidata.gaId;
      res.set("X-Frame-Options", "DENY");
      res.set("X-Content-Type-Options", "nosniff");
      res.set("Content-Security-Policy", 'frame-ancestors "self"');
      res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
      res.set(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
      const review = req.body.editReview;
      res.render("bulkupload/grantingauthority-addsuccessfully", {
        gaID,
        review,
      });
    } catch (err) {
      response_error_message = err;
      console.log("message error : " + err);
      console.log("response_error_message catch : " + response_error_message);
      // res.render('publicusersearch/noresults');
    }
  } else {
    try {
      // const gaName = req.body.GaName.replace(/ /g, "");
      // var azGroupName = gaName;
      // console.log("granting authority", env[1]);
      // if (env[1] != "prod") env[1] + "_" + gaName;
      var userPrincipleRequest = new Object();
      userPrincipleRequest.password = "password123";
      userPrincipleRequest.role = dashboard_roles;
      userPrincipleRequest.grantingAuthorityGroupId = dashbaord_ga_ID;
      userPrincipleRequest.grantingAuthorityGroupName = dashboard_ga_name;

      if (dashboard_roles == "BEIS Administrator") {
        userPrincipleRequest.userName = "TEST";
      } else if (dashboard_roles == "Granting Authority Approver") {
        userPrincipleRequest.userName = "SYSTEM";
      } else if (dashboard_roles == "Granting Authority Approver") {
        userPrincipleRequest.userName = "SYSTEM";
      } else if (dashboard_roles == "Granting Authority Encoder") {
        userPrincipleRequest.userName = "SYSTEM";
      }
      res.set("X-Frame-Options", "DENY");
      res.set("Content-Security-Policy", 'frame-ancestors "self"');
      res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
      res.set(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
      console.log("userPrincipleRequest", JSON.stringify(userPrincipleRequest));
      const apidata = await axios.post(
        beis_url_accessmanagement + "/grantingAuthority",
        {
          headers: {
            userPrinciple: JSON.stringify(userPrincipleRequest),
            "Content-Type": "application/json;charset=utf-8",
          },
        },
        {
          name: req.body.GaName,
        }
      );
      const gaID = apidata.gaId;
      console.log("Status : " + JSON.stringify(apidata));

      const review = "";
      res.render("bulkupload/grantingauthority-addsuccessfully", {
        gaID,
        review,
      });
    } catch (err) {
      response_error_message = err;
      console.log("message error : " + err);
      if (err.toString().includes("417")) {
        grantingAuthorityName_Error = true;
        grantingAuthorityName_Error_Msg = "Granting Authority already added";
        grantingAuthorityName_Global = req.body.GaName;
        res.render("bulkupload/grantingauthority-add", {
          grantingAuthorityName_Error,
          grantingAuthorityName_Error_Msg,
          grantingAuthorityName_Global,
        });
      }
    }
  }
});

module.exports = router;
