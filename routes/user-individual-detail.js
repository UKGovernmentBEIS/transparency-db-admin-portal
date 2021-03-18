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
  ssn.Delete_UserId = req.query.userObject;

  ssn.GAUserList.value.forEach(function (item) {
    if (ssn.Delete_UserId == item.id) {
      if (Environment_variable !== "env=prod") {
        var role = item.roleName.split("_");
        if (role[1] == "GrantingAuthorityAdministrators") {
          ssn.User_Role_Single = "Granting Authority Administrator";
        } else if (role[1] == "GrantingAuthorityEncoders") {
          ssn.User_Role_Single = "Granting Authority Encoder";
        } else if (role[1] == "BEISAdministrators") {
          ssn.User_Role_Single = "BEIS Administrator";
        } else {
          ssn.User_Role_Single = "Granting Authority Approver";
        }
      } else {
        if (item.roleName == "GrantingAuthorityAdministrators") {
          ssn.User_Role_Single = "Granting Authority Administrator";
        } else if (item.roleName == "GrantingAuthorityEncoders") {
          ssn.User_Role_Single = "Granting Authority Encoder";
        } else if (item.roleName == "BEISAdministrators") {
          ssn.User_Role_Single = "BEIS Administrator";
        } else {
          ssn.User_Role_Single = " Granting Authority Approver";
        }
      }
      // ssn.User_Role_Single = item.roleName;
      if (!GA_Selected) ssn.User_GA_Name = ssn.User_Role_Single;
      else ssn.User_GA_Name = GA_Selected;
      ssn.User_Name_Single = item.givenName;
      ssn.User_Last_Name_Single = item.surname;
      if (!item.mail) ssn.User_Email_Single = item.userPrincipalName;
      else ssn.User_Email_Single = item.mail;
      ssn.User_Mobile_Single = item.mobilePhone;
    }
  });

  console.log("User :" + GA_Selected);

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
