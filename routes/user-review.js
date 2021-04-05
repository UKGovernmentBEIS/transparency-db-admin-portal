const express = require("express");
var session = require("express-session");
const router = express.Router();

router.post("/", async (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined"
  ) {
    res.redirect("/signout");
  } else {
    ssn.User_Role_Error = false;
    ssn.Email_Id_Error = false;
    ssn.GA_Error = false;
    ssn.GA_msg = "";
    ssn.GA_Name_User_Error = false;
    ssn.UserErrorLength_Global = 0;
    UserErrors = [];
    UserFocus = [];

    var { userRole, GA_Name_User, Email_Id, buttonvalue } = req.body;

    if (!userRole) {
      ssn.User_Role_Error = true;
      UserErrors.push(" Choose the role of the user");
      UserFocus.push("#role-id");
    }

    if (
      !GA_Name_User &&
      ssn.dashboard_roles == "BEIS Administrator" &&
      userRole !== "BEIS Administrator"
    ) {
      ssn.GA_Name_User_Error = true;
      UserErrors.push(" Enter the granting authority name");
      UserFocus.push("#EmailId");
    }

    if (!Email_Id) {
      ssn.Email_Id_Error = true;
      ssn.Email_Msg = "Enter the email id";
      UserErrors.push(" Enter the email id");
      UserFocus.push("#EmailId");
    }

    console.log("Detaials of User : " + userRole + GA_Name_User + Email_Id);
    console.log("ssn.dashboard_ga_name", ssn.dashboard_ga_name);
    ssn.User_Role_Global = userRole;
    if (
      ssn.User_Role_Global == "BEIS Administrator" ||
      ssn.dashboard_roles == "Granting Authority Administrator"
    ) {
      ssn.GA_Name_User_Global = ssn.dashboard_ga_name;
    } else {
      ssn.GA_Name_User_Global = GA_Name_User;
    }

    ssn.Email_Id_Global = Email_Id;

    ssn.UserErrorLength_Global = UserErrors.length;
    if (buttonvalue == "Continue") {
      if (ssn.UserErrorLength_Global > 0) {
        res.render("bulkupload/user-add", {
          change: "No",
        });
      } else {
        console.log("review : " + ssn.GA_Name_User_Global);
        res.render("bulkupload/user-review", {
          ssn,
          // ssn.User_Role_Global,
          // ssn.Email_Id_Global,
          // ssn.GA_Name_User_Global,
        });
      }
    } else res.render("bulkupload/user-cancel");
  }
});

router.get("/", (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined"
  ) {
    res.redirect("/signout");
  } else {
    res.render("bulkupload/user-review");
  }
});

module.exports = router;
