const express = require("express");
var session = require("express-session");
const router = express.Router();

router.get("/", (req, res) => {
  ssn = req.session;
  check_new_user = req.query.newuser;

  if (check_new_user == "yes") {
    ssn.User_Role_Global = "";
    ssn.GA_Name_User_Global = "";
    ssn.Email_Id_Global = "";
    ssn.Full_Name_Global = "";
    ssn.Last_Name_Global = "";
    ssn.Phone_Number_Global = "";
  }

  // ssn.User_Role_Global = "";
  // ssn.GA_Name_User_Global = "";
  // ssn.Email_Id_Global = "";
  ssn.Email_Id_Error = false;
  ssn.Email_msg = "";
  ssn.User_Role_Error = false;
  ssn.GA_Name_User_Error = false;
  ssn.UserErrorLength_Global = "";
  UserErrors = [];
  UserFocus = [];

  console.log("ssn.GA_Name_User_Global :" + ssn.GA_Name_User_Global);
  console.log("ssn.GA_Name_User_Global :" + ssn.Email_Id_Global);

  if (
    ssn.dashboard_roles == "BEIS Administrator" ||
    ssn.dashboard_roles == "Granting Authority Administrator"
  ) {
    res.render("bulkupload/user-add", {
      change: "No",
    });
  }
});

module.exports = router;
