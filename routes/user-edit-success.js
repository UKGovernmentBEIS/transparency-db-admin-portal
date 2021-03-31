const express = require("express");
var session = require("express-session");
const axios = require("axios");
const router = express.Router();

router.post("/", async (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined" ||
    req.session.cookie.maxAge <= 0
  ) {
    res.redirect("/signout");
  } else {
    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    //   ssn.User_Role_Single = req.body.userRole;
    //   ssn.User_GA_Name = req.body.GA_Selected;
    //   ssn.User_Name_Single = req.body.User_Name_Single;
    //   ssn.User_Last_Name_Single = req.body.User_Last_Name_Single;
    //   ssn.User_Email_Single = req.body.User_Email_Single;
    //   ssn.User_Mobile_Single = req.body.User_Mobile_Single;

    try {
      var data_request = {
        surname: ssn.User_Last_Name_Single,
        mobilePhone: ssn.User_Mobile_Single,
        givenName: ssn.User_Name_Single,
      };

      console.log("ssn.addUser_extract", ssn.addUser_extract);
      console.log(
        "ssn.UserPrincipleObjectGlobal",
        ssn.UserPrincileObjectGlobal
      );
      console.log("data_request post :" + JSON.stringify(data_request));

      const addAPIUser = await axios.patch(
        beis_url_accessmanagement +
          "/usermanagement/updateUser/" +
          ssn.addUser_extract,
        data_request,
        ssn.UserPrincileObjectGlobal
      );

      console.log(`Status: ${addAPIUser.status}`);
      API_response_code = `${addAPIUser.status}`;
      console.log("API_response_code: try" + API_response_code);
      console.log("Body: ", addAPIUser.data);
      addAPIUser_extract = addAPIUser.data;
      res.render("bulkupload/user-updated-successfully", { ssn });
    } catch (err) {
      console.log("message error : " + err);
      if (err.toString().includes("500")) res.render("bulkupload/notAvailable");
      else if (err.toString().includes("401"))
        res.render("bulkupload/notAuthorized");
    }
  }
});

module.exports = router;
