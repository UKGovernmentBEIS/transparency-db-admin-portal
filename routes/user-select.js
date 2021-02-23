const express = require("express");
const router = express.Router();
const axios = require("axios");
var request = require("request");

router.get("/", async (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  GA_Selected = "";

  User_Role_Global = "";
  GA_Name_User_Global = "";
  Full_Name_Global = "";
  Last_Name_Global = "";
  Email_Id_Global = "";
  Phone_Number_Global = "";
  console.log("UserPrincileObjectGlobal", UserPrincileObjectGlobal);
  try {
    var apiroles = await axios.get(
      beis_url_accessmanagement + "/accessmanagement/rolebasedgas",
      UserPrincileObjectGlobal
    );
    console.log(`Status: ${apiroles.status}`);
    console.log("Body: ", apiroles.data);
    apiroles_extract = apiroles.data;
    apiroles_total_objects = Object.keys(apiroles_extract).length;
    isUserSelectIsPrimaryCall = true;
    gaNamesList = [];
    Environment_variable = process.argv[2];
    env = Environment_variable.split("=");
    apiroles.data.forEach((items) => {
      if (
        items.gaName !=
          (env[1] + "_grantingauthorityadministrators").toLowerCase() ||
        items.gaName !=
          (env[1] + "_grantingauthorityapprovers").toLowerCase() ||
        items.gaName != (env[1] + "_grantingauthorityencoders").toLowerCase() ||
        items.gaName != (env[1] + "_beisadministrators").toLowerCase()
      )
        gaNamesList.push(items.gaName);
    });
    console.log("gaNamesList", gaNamesList);
    res.render("bulkupload/user-select", { gaNamesList });
  } catch (err) {
    response_error_message = err;
    console.log("message error : " + err);
    console.log("response_error_message catch : " + response_error_message);
  }
});

router.post("/", async (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  var { Granting_Authority_Selected } = req.body;

  GA_Selected = Granting_Authority_Selected;

  console.log("Granting_Authority_Selected :" + Granting_Authority_Selected);

  for (var i = 0; i < apiroles_total_objects; i++) {
    if (GA_Selected == apiroles_extract[i].gaName) {
      console.log("gaName id2 : " + apiroles_extract[i].azGrpId);
      GA_Object_Id = apiroles_extract[i].azGrpId;
      GA_Group_Id = apiroles_extract[i].gaId;
    }
  }

  //   const userPrincipleRequest =
  //   '{"userName":"SYSTEM","password":"password123",' + '"role":"' + GA_Selected  + '","grantingAuthorityGroupId":"' + GA_Group_Id + '","grantingAuthorityGroupName":"' +
  //   dashboard_ga_name +  '"}';

  //   console.log("userprincile: " + userPrincipleRequest );
  // var config = {
  //   headers: {
  //     userPrinciple: userPrincipleRequest
  //   },
  // };

  console.log("GA_Object_Id", GA_Object_Id);

  try {
    const apidata = await axios.get(
      beis_url_accessmanagement + "/usermanagement/groups/" + GA_Object_Id,
      UserPrincileObjectGlobal
    );
    console.log(`Status: ${apidata.status}`);
    API_response_code = `${apidata.status}`;
    console.log("API_response_code: try" + API_response_code);
    console.log("Body: ", apidata.data);
    GAUserList = apidata.data;
    isUserSelectIsPrimaryCall = false;

    User_Role_Global = "";
    GA_Name_User_Global = "";
    Full_Name_Global = "";
    Last_Name_Global = "";
    Email_Id_Global = "";
    Phone_Number_Global = "";

    res.render("bulkupload/user-select");
  } catch (err) {
    response_error_message = err;
    console.log("message error : " + err);
    console.log("response_error_message catch : " + response_error_message);
  }
});

module.exports = router;
