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

  try {
    const apiroles = await axios.get(
      beis_url_accessmanagement + "/accessmanagement/allga"
    );
    console.log(`Status: ${apiroles.status}`);
    API_response_code = `${apiroles.status}`;
    console.log("API_response_code: try" + API_response_code);
    console.log("Body: ", apiroles.data);
    ssn.apiroles_extract = apiroles.data;
    ssn.apiroles_total_objects = Object.keys(ssn.apiroles_extract).length;
    console.log(" ssn.apiroles_total_objects: ", ssn.apiroles_total_objects);

    for (var i = 0; i < ssn.apiroles_total_objects; i++) {
      if (ssn.User_Role_Global == ssn.apiroles_extract[i].gaName) {
        console.log("gaName id1 : " + ssn.apiroles_extract[i].azGrpId);
        apiroles_gaRole_object = ssn.apiroles_extract[i].azGrpId;
      }
    }

    for (var i = 0; i < ssn.apiroles_total_objects; i++) {
      if (ssn.GA_Name_User_Global == ssn.apiroles_extract[i].gaName) {
        console.log("gaName id1 : " + ssn.apiroles_extract[i].azGrpId);
        apiroles_gaName_object = ssn.apiroles_extract[i].azGrpId;
      }
    }
  } catch (err) {
    console.log("message error : " + err);
    if (err.toString().includes("500")) res.render("bulkupload/notAvailable");
    else if (err.toString().includes("401"))
      res.render("bulkupload/notAuthorized");
  }

  var data_request = {
    invitedUserEmailAddress: ssn.Email_Id_Global,
    inviteRedirectUrl: beis_redirect_url,
    sendInvitationMessage: true,
    grpRoleIds: [apiroles_gaRole_object, apiroles_gaName_object],
  };

  var data = JSON.parse(JSON.stringify(data_request));
  console.log("request data user submit: " + JSON.stringify(data));

  try {
    const addUser = await axios.post(
      beis_url_accessmanagement + "/usermanagement/invitation",
      data,
      ssn.UserPrincileObjectGlobal
    );

    console.log(`Status: ${addUser.status}`);
    API_response_code = `${addUser.status}`;
    console.log("API_response_code: try" + API_response_code);
    console.log("Body: ", addUser.data);
    ssn.addUser_extract = addUser.data.invitedUser.id;
    console.log("user_id_from_API :" + ssn.addUser_extract);

    ssn.Full_Name_Error = false;
    ssn.Last_Name_Error = false;
    ssn.Phone_Number_Error = false;
    UserErrors = [];
    UserFocus = [];
    UserErrorsLenght = 0;

    res.render("bulkupload/user-add-personal");
  } catch (err) {
    // console.log(
    //   "ssn.UserPrincileObjectGlobal :" + JSON.stringify(ssn.UserPrincileObjectGlobal)
    // );
    if (err.toString().includes("500")) res.render("bulkupload/notAvailable");
    else if (err.toString().includes("401"))
      res.render("bulkupload/notAuthorized");
    else if (err.toString().includes("400")) {
      UserErrors = [];
      UserFocus = [];
      ssn.Email_Id_Error = true;
      ssn.Email_msg = "Email Id or Group already exist";
      ssn.UserErrorLength_Global = 1;
      UserErrors.push("Email Id or Group already exist");
      UserFocus.push("#EmailId");

      res.render("bulkupload/user-add", {
        change: "Yes",
      });
    }
    console.log("message error : " + err);
  }
});

router.get("/", async (req, res) => {
  ssn = req.session;
  ssn.Full_Name_Error = false;
  ssn.Last_Name_Error = false;
  ssn.Phone_Number_Error = false;
  UserErrors = [];
  UserFocus = [];
  UserErrorsLenght = 0;

  res.render("bulkupload/user-add-personal");
});

module.exports = router;
