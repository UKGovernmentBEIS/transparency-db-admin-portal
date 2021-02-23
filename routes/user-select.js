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
  GAUserList_Empty =1;
  console.log("UserPrincileObjectGlobal", UserPrincileObjectGlobal);

  // if the login user is BEIS admin 
if (dashboard_roles == "BEIS Administrator"){
  
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
    gaRolesList = [];
   
    apiroles.data.forEach((items) => {
      if (
        items.gaName == "BEIS Administrator" || items.gaName == "Granting Authority Administrator" || 
        items.gaName == "Granting Authority Approver" || items.gaName =="Granting Authority Encoder" )
       {
        gaRolesList.push(items.gaName); 
       }
        else
         {
        gaNamesList.push(items.gaName); }
      });
    console.log("gaNamesList", gaNamesList);
    res.render("bulkupload/user-select", { gaNamesList });
  } catch (err) {
    response_error_message = err;
    console.log("message error : " + err);
    console.log("response_error_message catch : " + response_error_message);
  }

}    //end of if (beis administator)

else {

  GA_Selected = dashboard_ga_name;

  for (var i = 0; i < apiroles_total_objects; i++) {
    if (GA_Selected == apiroles_extract[i].gaName) {
      console.log("gaName id2 : " + apiroles_extract[i].azGrpId);
      GA_Object_Id = apiroles_extract[i].azGrpId;
      GA_Group_Id = apiroles_extract[i].gaId;
    }
  }

  
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

    res.render("bulkupload/user-select-ga");
  } catch (err) {
    response_error_message = err;
    console.log("message error : " + err);
    console.log("response_error_message catch : " + response_error_message);
  }


}

});

router.post("/", async (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  var { Granting_Authority_Selected ,GA_Roles_Selected ,button_value} = req.body;

  console.log("button_value  : " + button_value);

  if (button_value == "GASelected") {
    GA_Selected = Granting_Authority_Selected;
    Roles_Selected = '';
  }

  else if (button_value == "RoleSelected")  {
    Roles_Selected = GA_Roles_Selected
    GA_Selected ='';
  }

 

  if (GA_Selected) {

  for (var i = 0; i < apiroles_total_objects; i++) {
    if (GA_Selected == apiroles_extract[i].gaName) {
      console.log("gaName id2 : " + apiroles_extract[i].azGrpId);
      GA_Object_Id = apiroles_extract[i].azGrpId;
      GA_Group_Id = apiroles_extract[i].gaId;
    }
  }
  }

  if (Roles_Selected) {
  for (var i = 0; i < apiroles_total_objects; i++) {
    if (Roles_Selected == apiroles_extract[i].gaName) {
      console.log("gaName id2 : " + apiroles_extract[i].azGrpId);
      GA_Object_Id = apiroles_extract[i].azGrpId;
      GA_Group_Id = apiroles_extract[i].gaId;
    }
  }
  }

  
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
    GAUserList_Empty = Object.keys(GAUserList.value).length;
    console.log(" GAUserList_Empty : " +  GAUserList_Empty);
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
