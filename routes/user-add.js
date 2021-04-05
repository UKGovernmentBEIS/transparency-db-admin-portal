const express = require("express");
var session = require("express-session");
const router = express.Router();

router.get("/", (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined"
  ) {
    res.redirect("/signout");
  } else {
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
    ssn.GA_Error = false;
    ssn.GA_msg = "";
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
  }
});

module.exports = router;
