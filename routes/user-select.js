const express = require("express");
const router = express.Router();
const axios = require("axios");
var request = require("request");

router.get("/", (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  GA_Selected = "";
  
  User_Role_Global = '';
  GA_Name_User_Global =  '';
  Full_Name_Global = '';
  Last_Name_Global = '';
  Email_Id_Global = '';
  Phone_Number_Global = '';
  
  isUserSelectIsPrimaryCall = true;
  res.render("bulkupload/user-select");
});

router.post("/", async(req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  var { Granting_Authority_Selected }  = req.body;
  GA_Selected  = Granting_Authority_Selected ;
  console.log("Granting_Authority_Selected :" + Granting_Authority_Selected);

  for (var i = 0; i < apiroles_total_objects; i++) { 
    if( GA_Selected == apiroles_extract[i].gaName ) {
      console.log( "gaName id2 : " + apiroles_extract[i].azGrpId );
      GA_Object_Id = apiroles_extract[i].azGrpId ;
      GA_Group_Id = apiroles_extract[i].gaId ;
    }
  }

  const userPrincipleRequest =
  '{"userName":"SYSTEM","password":"password123",' + '"role":"' + GA_Selected  + '","grantingAuthorityGroupId":"' + GA_Group_Id + '","grantingAuthorityGroupName":"' +
  dashboard_ga_name +
  '"}';

  console.log("userprincile: " + userPrincipleRequest );
var config = {
  headers: {
    userPrinciple: userPrincipleRequest
  },
};


  try {
    const apidata = await axios.get(
    beis_url_accessmanagement + "/usermanagement/groups/" + GA_Object_Id ,
    config
  );
  console.log(`Status: ${apidata.status}`);
  API_response_code = `${apidata.status}`;
  console.log("API_response_code: try" + API_response_code);
  console.log("Body: ", apidata.data);
  GAUserList = apidata.data;
  isUserSelectIsPrimaryCall = false;

  User_Role_Global = '';
  GA_Name_User_Global =  '';
  Full_Name_Global = '';
  Last_Name_Global = '';
  Email_Id_Global = '';
  Phone_Number_Global = '';

  res.render("bulkupload/user-select");
} catch (err) {
  response_error_message = err;
  console.log("message error : " + err);
  console.log("response_error_message catch : " + response_error_message);
}


});


module.exports = router;
