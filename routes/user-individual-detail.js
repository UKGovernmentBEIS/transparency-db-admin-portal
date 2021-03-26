const express = require("express");
var session = require("express-session");
const router = express.Router();

router.get("/", (req, res) => {
  ssn = req.session;
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  console.log("req.query.userObject: " + req.query.userObject);
  console.log("ssn.GAUserList", ssn.GAUserList);
  ssn.Delete_UserId = req.query.userObject;
  ssn.addUser_extract = req.query.userObject;
  for (var item = 0; item < ssn.GAUserList.value.length; item++) {
    // ssn.GAUserList.value.forEach(function (item) {
    if (ssn.Delete_UserId == ssn.GAUserList.value[item].id) {
      // if (Environment_variable !== "env=prod") {
      //   var role = item.roleName.split("_");
      if (
        ssn.GAUserList.value[item].roleName.includes(
          "GrantingAuthorityAdministrators"
        )
      ) {
        ssn.User_Role_Single = "Granting Authority Administrator";
      } else if (
        ssn.GAUserList.value[item].roleName.includes(
          "GrantingAuthorityEncoders"
        )
      ) {
        ssn.User_Role_Single = "Granting Authority Encoder";
      } else if (
        ssn.GAUserList.value[item].roleName.includes("BEISAdministrators")
      ) {
        ssn.User_Role_Single = "BEIS Administrator";
      } else {
        ssn.User_Role_Single = "Granting Authority Approver";
      }
      // } else {
      //   if (item.roleName == "GrantingAuthorityAdministrators") {
      //     ssn.User_Role_Single = "Granting Authority Administrator";
      //   } else if (item.roleName == "GrantingAuthorityEncoders") {
      //     ssn.User_Role_Single = "Granting Authority Encoder";
      //   } else if (item.roleName == "BEISAdministrators") {
      //     ssn.User_Role_Single = "BEIS Administrator";
      //   } else {
      //     ssn.User_Role_Single = " Granting Authority Approver";
      //   }
      // }
      // ssn.User_Role_Single = item.roleName;
      if (!GA_Selected) ssn.User_GA_Name = ssn.User_Role_Single;
      else ssn.User_GA_Name = GA_Selected;
      if (!ssn.GAUserList.value[item].givenName)
        ssn.User_Name_Single = ssn.GAUserList.value[item].displayName;
      else ssn.User_Name_Single = ssn.GAUserList.value[item].givenName;
      ssn.User_Last_Name_Single = ssn.GAUserList.value[item].surname;
      if (!ssn.GAUserList.value[item].mail)
        ssn.User_Email_Single = ssn.GAUserList.value[item].userPrincipalName;
      else ssn.User_Email_Single = ssn.GAUserList.value[item].mail;
      ssn.User_Mobile_Single = ssn.GAUserList.value[item].mobilePhone;
    }
    break;
  }
  // });

  console.log("User :" + ssn.User_Role_Single);

  // for ( var i=0 ; i< GAUserList_total_objects; i++) {
  //   if( ssn.Delete_UserId == ssn.GAUserList.value[i].id ) {
  //     console.log( "gaName id1 : " + ssn.apiroles_extract[i].gaName );
  //     apiroles_extract_object1 = ssn.apiroles_extract[i].gaName ;
  //     dashbaord_ga_ID = ssn.apiroles_extract[i].gaId ;

  //   }
  // }

  res.render("bulkupload/user-individual-detail");
});

module.exports = router;
