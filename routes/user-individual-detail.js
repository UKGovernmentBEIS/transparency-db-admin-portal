const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  console.log("req.query.userObject: " + req.query.userObject);
  Delete_UserId = req.query.userObject;


  GAUserList.value.forEach(function(item) {
    if( Delete_UserId == item.id ) {  
      User_Role_Single = item.roleName;
      User_GA_Name = GA_Selected;
      User_Name_Single = item.displayName;
      User_Last_Name_Single = item.surname;
      User_Email_Single = item.userPrincipalName;
      User_Mobile_Single = item.mobilePhone;

    }
    
  } );

    console.log("User :" + User_GA_Name);

  // for ( var i=0 ; i< GAUserList_total_objects; i++) {
  //   if( Delete_UserId == GAUserList.value[i].id ) {
  //     console.log( "gaName id1 : " + apiroles_extract[i].gaName );
  //     apiroles_extract_object1 = apiroles_extract[i].gaName ;
  //     dashbaord_ga_ID = apiroles_extract[i].gaId ;

  //   }
  // }

  res.render("bulkupload/user-individual-detail");
});

module.exports = router;
