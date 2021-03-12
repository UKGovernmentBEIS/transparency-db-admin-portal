const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  var {
    userRole,
    GA_Name_User,
    Full_Name,
    Last_Name,
    Email_Id,
    Phone_Number,
  } = req.body;

  if (!Full_Name) {
    Subsidy_Control_Number_Error = true;
  }
  console.log(
    "Detaials of User : " +
      userRole +
      GA_Name_User +
      Full_Name +
      Last_Name +
      Email_Id +
      Phone_Number
  );

  User_Role_Global = userRole;
  if (dashboard_roles == "BEIS Administrator") {
    GA_Name_User_Global = GA_Name_User;
  } else {
    GA_Name_User_Global = dashboard_ga_name;
  }

  Full_Name_Global = Full_Name;
  Last_Name_Global = Last_Name;
  Email_Id_Global = Email_Id;
  Phone_Number_Global = Phone_Number;

  res.render("bulkupload/user-review");
});

router.get("/", (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  res.render("bulkupload/user-review");
});

module.exports = router;
