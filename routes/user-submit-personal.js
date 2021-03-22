const express = require("express");
var session = require("express-session");
const router = express.Router();

const axios = require("axios");
var request = require("request");

router.post("/", async (req, res) => {
  ssn = req.session;
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  // Full_Name_Edit_Global = ssn.Full_Name_Global + " " + ssn.Last_Name_Global;
  // Full_Name_Edit_Global = ssn.Full_Name_Global;
  var data_request = {
    surname: ssn.Last_Name_Global,
    mobilePhone: ssn.Phone_Number_Global,
    givenName: ssn.Full_Name_Global,
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
      beis_url_accessmanagement +
        "/usermanagement/updateUser/" +
        ssn.addUser_extract,
      data_User,
      ssn.UserPrincipleObjectGlobal
    );

    console.log(`Status: ${addAPIUser.status}`);
    API_response_code = `${addAPIUser.status}`;
    console.log("API_response_code: try" + API_response_code);
    console.log("Body: ", addAPIUser.data);
    addAPIUser_extract = addAPIUser.data;
    res.render("bulkupload/user-added-successfully");
  } catch (err) {
    console.log("message error : " + err);
    if (err.toString().includes("500")) res.render("bulkupload/notAvailable");
    else if (err.toString().includes("401"))
      res.render("bulkupload/notAuthorized");
  }

  //  console.log(1);
  //     await new Promise(resolve => setTimeout(resolve, 10000));
  //     console.log(2);
});

module.exports = router;
