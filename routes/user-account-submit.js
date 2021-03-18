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

  // ssn.Full_Name_Global = req.body.firstName;
  // ssn.Last_Name_Global = req.body.lastName;
  // ssn.Email_Id_Global = req.body.emailId;
  // ssn.Phone_Number_Global = req.body.mobileNumber;
  // ssn.User_Role_Global = req.body.dashboard_roles;
  // ssn.GA_Name_User_Global = req.body.dashboard_ga_name;
  // Full_Name_Edit_Global = ssn.Full_Name_Global + " " + ssn.Last_Name_Global;

  var data_request = {
    surname: ssn.Last_Name_Global,
    mobilePhone: ssn.Phone_Number_Global,
    // givenName: Full_Name_Edit_Global,
    givenName: ssn.Full_Name_Global,
    // userPrincipalName: ssn.Email_Id_Global,
  };

  var data_User = JSON.parse(JSON.stringify(data_request));
  console.log("request data : " + JSON.stringify(data_User));

  var userPrincipleRequest =
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

  console.log("userprincile: " + userPrincipleRequest);
  ssn.UserPrincipleObjectGlobal = {
    headers: {
      "content-type": "application/json",
      userPrinciple: userPrincipleRequest,
    },
  };

  console.log("ssn.addUser_extract" + ssn.addUser_extract);

  try {
    console.log("data_request post :" + JSON.stringify(data_request));
    const addAPIUser = await axios.patch(
      beis_url_accessmanagement + "/usermanagement/updateUser/" + ssn.user_id,
      data_User,
      ssn.UserPrincipleObjectGlobal
    );

    console.log(`Status: ${addAPIUser.status}`);
    API_response_code = `${addAPIUser.status}`;
    console.log("API_response_code: try" + API_response_code);
    console.log("Body: ", addAPIUser.data);
    addAPIUser_extract = addAPIUser.data;
    res.render("bulkupload/user-account-submit", { ssn });
  } catch (err) {
    console.log("message error : " + err);
    if (err.toString().includes("500")) res.render("bulkupload/notAvailable");
    else if (err.toString().includes("401"))
      res.render("bulkupload/notAuthorized");
  }
});

module.exports = router;
