const express = require("express");
const axios = require("axios");
var session = require("express-session");
const router = express.Router();
var jwt_decode = require("jwt-decode");

router.post("/", async (req, res) => {
  ssn = req.session;
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  console.log("user name :" + ssn.dashboard_user_name);

  //   ssn.Full_Name_Global = req.body.firstName;
  //   ssn.Last_Name_Global = req.body.lastName;
  //   ssn.Email_Id_Global = req.body.emailId;
  //   ssn.Phone_Number_Global = req.body.mobileNumber;
  //   ssn.User_Role_Global = req.body.dashboard_roles;
  //   ssn.GA_Name_User_Global = req.body.dashboard_ga_name;

  try {
    const apidata = await axios.get(
      beis_url_accessmanagement + "/usermanagement/users/" + ssn.user_id,
      ssn.UserPrincileObjectGlobal
    );
    console.log(`Status: ${apidata.status}`);
    console.log("Body: ", apidata.data);
    ssn.Full_Name_Global = apidata.data.givenName;
    ssn.Last_Name_Global = apidata.data.surname;
    if (!apidata.data.mail)
      ssn.Email_Id_Global = apidata.data.userPrincipalName;
    else ssn.Email_Id_Global = apidata.data.mail;
    ssn.Phone_Number_Global = apidata.data.mobilePhone;
    res.render("bulkupload/user-account-submit", { ssn });
  } catch (err) {
    console.log("message error : " + err);
    if (err.toString().includes("500")) res.render("bulkupload/notAvailable");
    else if (err.toString().includes("401"))
      res.render("bulkupload/notAuthorized");
  }
});

module.exports = router;
