const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/", async (req, res) => {


  if (req.body.editReview == "true") {
    var gaID_extract = req.body.grantingAuthorityID;
    var gaID_Name = {
      "name": req.body.grantingAuthorityName,
    };
 
    try {
      const apidata = await axios.put(
        beis_url_searchscheme + "/grantingAuthority/" + gaID_extract , gaID_Name ,UserPrincileObjectGlobal
        
       
      );
      // const gaID = apidata.gaId;
      res.set("X-Frame-Options", "DENY");
      res.set("X-Content-Type-Options", "nosniff");
      res.set("Content-Security-Policy", 'frame-ancestors "self"');
      res.set("Access-Control-Allow-Origin", beis_url_searchscheme);
      res.set(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
      const review = req.body.editReview;
      res.render("bulkupload/grantingauthority-addsuccessfully", {
        gaID_extract,
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
      var userPrincipleRequest = new Object();
      userPrincipleRequest.password = "password123";
      userPrincipleRequest.role = dashboard_roles;
      userPrincipleRequest.grantingAuthorityGroupId = dashbaord_ga_ID;
      userPrincipleRequest.grantingAuthorityGroupName = dashboard_ga_name;
      userPrincipleRequest.userName = dashboard_user_name;

      res.set("X-Frame-Options", "DENY");
      res.set("Content-Security-Policy", 'frame-ancestors "self"');
      res.set("Access-Control-Allow-Origin", beis_url_searchscheme);
      res.set(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
      var data1 = {
        name: req.body.GaName,
      };
      // data = JSON.parse(JSON.stringify(data));
      console.log("userPrincipleRequest", UserPrincileObjectGlobal);
      console.log("beis_url_searchscheme", beis_url_searchscheme);
      console.log("data", data1);

      const apidata = await axios.post(
        beis_url_searchscheme + "/grantingAuthority",data1
      
      );
      var apidata_extract = apidata.data
      var gaID_extract = apidata_extract.gaId;
     
      const review = "";
      res.render("bulkupload/grantingauthority-addsuccessfully", {
        gaID_extract,
        review,
      });
    } catch (err) {
      response_error_message = err;
      console.log("message error GA : " + err);
      if (err.toString().includes("500")) {
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
