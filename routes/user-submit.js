const express = require("express");
const router = express.Router();
const axios = require("axios");
var request = require("request");

router.post("/", async(req, res) => {
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
  apiroles_extract = apiroles.data;
  apiroles_total_objects = Object.keys(apiroles_extract).length;
  console.log(" apiroles_total_objects: ",  apiroles_total_objects);

  for (var i = 0; i < apiroles_total_objects; i++) { 
    if( User_Role_Global == apiroles_extract[i].gaName ) {
      console.log( "gaName id1 : " + apiroles_extract[i].azGrpId );
      apiroles_gaRole_object = apiroles_extract[i].azGrpId ;

    }
  }

  for (var i = 0; i < apiroles_total_objects; i++) { 
    if( GA_Name_User_Global == apiroles_extract[i].gaName ) {
      console.log( "gaName id1 : " + apiroles_extract[i].azGrpId );
      apiroles_gaName_object = apiroles_extract[i].azGrpId ;

    }
  }


} catch (err) {
  response_error_message = err;
  console.log("message error : " + err);
  console.log("response_error_message catch : " + response_error_message);
}

const userPrincipleRequest =
'{"userName":"SYSTEM","password":"password123",' + '"role":"' + dashboard_roles
+ '","grantingAuthorityGroupId":"' + dashbaord_ga_ID + '","grantingAuthorityGroupName":"' +
dashboard_ga_name +
'"}';

console.log("userprincile: " + userPrincipleRequest );
UserPrincileObjectGlobal = {
headers: {
  userPrinciple: userPrincipleRequest
},
};


var data_request = {
  "accountEnabled": true,
  "displayName": Full_Name_Global,
  "mailNickname": Last_Name_Global,
  "userPrincipalName": Email_Id_Global,
  "mobilePhone": Phone_Number_Global,
  "passwordProfile": {
  "forceChangePasswordNextSignIn": false, 
  "password": "Monday@123"
  },
  "grpRoleIds": [
    apiroles_gaRole_object,apiroles_gaName_object
  ]
}

var data = JSON.parse(JSON.stringify(data_request));
  console.log("request data : " + JSON.stringify(data));


  try {
    const addUser = await axios.post(
    beis_url_accessmanagement + "/usermanagement/adduser" , data , UserPrincileObjectGlobal 
    
  );

  
  console.log(`Status: ${addUser.status}`);
  API_response_code = `${addUser.status}`;
  console.log("API_response_code: try" + API_response_code);
  console.log("Body: ", addUser.data);
  addUser_extract = addUser.data;
  res.render("bulkupload/user-added-successfully");
 

} catch (err) {
  
  response_error_message = err;
  console.log("message error : " + err);
  console.log("response_error_message catch : " + response_error_message);
}

});


module.exports = router;
