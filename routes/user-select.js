// ********************************************************************
// Gov.UK transparency select user by role or granting authority module
// ********************************************************************

const express = require("express");
var session = require("express-session");
const router = express.Router();

const axios = require("axios");
var request = require("request");

router.get("/", async (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined"
  ) {
    res.redirect("/signout");
  } else {
    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    GA_Selected = "";

    No_Selected_text = "";
    No_Selected_GA = false;
    No_Selected_id = "";
    No_Selected_Role = false;

    ssn.User_Role_Global = "";
    ssn.GA_Name_User_Global = "";
    ssn.Full_Name_Global = "";
    ssn.Last_Name_Global = "";
    ssn.Email_Id_Global = "";
    ssn.Phone_Number_Global = "";
    ssn.GAUserList_Empty = 1;
    console.log("ssn.UserPrincileObjectGlobal from user select", ssn);
    console.log("ssn.dashboard roles:" + ssn.dashboard_roles);

    // if the login user is BEIS admin
    if (ssn.dashboard_roles == "BEIS Administrator") {
      try {
        var apiroles = await axios.get(
          beis_url_accessmanagement + "/accessmanagement/rolebasedgas",
          ssn.UserPrincileObjectGlobal
        );
        console.log(`Status: ${apiroles.status}`);
        console.log("Body: ", apiroles.data);
        ssn.apiroles_extract = apiroles.data;
        ssn.apiroles_total_objects = Object.keys(ssn.apiroles_extract).length;
        isUserSelectIsPrimaryCall = true;
        gaNamesList = [];
        gaRolesList = [];

        apiroles.data.forEach((items) => {
          if (
            items.gaName == "BEIS Administrator" ||
            items.gaName == "Granting Authority Administrator" ||
            items.gaName == "Granting Authority Approver" ||
            items.gaName == "Granting Authority Encoder"
          ) {
            gaRolesList.push(items.gaName);
          } else {
            gaNamesList.push(items.gaName);
            gaNamesList.sort(function (a, b) {
              // inner text suits best (even when formated somehow)
              if (a.toLowerCase() < b.toLowerCase()) return -1;
              if (a.toLowerCase() > b.toLowerCase()) return 1;
              return 0;
            });
          }
        });
        res.render("bulkupload/user-select", {
          gaNamesList,
          No_Selected_text,
          No_Selected_GA,
          No_Selected_Role,
          No_Selected_id,
        });
      } catch (err) {
        response_error_message = err;
        console.log("message error : " + err);
        console.log("response_error_message catch : " + response_error_message);
      }
    } //end of if (beis administator)
    else {
      GA_Selected = ssn.dashboard_ga_name;

      for (var i = 0; i < ssn.apiroles_total_objects; i++) {
        if (GA_Selected == ssn.apiroles_extract[i].gaName) {
          console.log("gaName id2 : " + ssn.apiroles_extract[i].azGrpId);
          GA_Object_Id = ssn.apiroles_extract[i].azGrpId;
          GA_Group_Id = ssn.apiroles_extract[i].gaId;
        }
      }

      console.log("GA_Object_Id", GA_Object_Id);
      console.log(
        "ssn.UserPrincileObjectGlobal role :" + ssn.UserPrincileObjectGlobal
      );

      try {
        const apidata = await axios.get(
          beis_url_accessmanagement + "/usermanagement/groups/" + GA_Object_Id,
          ssn.UserPrincileObjectGlobal
        );
        console.log(`Status: ${apidata.status}`);
        API_response_code = `${apidata.status}`;
        console.log("API_response_code: try" + API_response_code);
        console.log("Body: ", apidata.data);
        ssn.GAUserList = apidata.data;
        isUserSelectIsPrimaryCall = false;

        ssn.User_Role_Global = "";
        ssn.GA_Name_User_Global = "";
        ssn.Full_Name_Global = "";
        ssn.Last_Name_Global = "";
        ssn.Email_Id_Global = "";
        ssn.Phone_Number_Global = "";

        if (
          ssn.dashboard_roles == "Granting Authority Administrator" ||
          ssn.dashboard_roles == "Granting Authority Approver"
        ) {
          res.render("bulkupload/user-select-ga");
        } else {
          res.render("bulkupload/notAuthorized");
        }
      } catch (err) {
        response_error_message = err;
        console.log("message error : " + err);
        console.log("response_error_message catch : " + response_error_message);
      }
    }
  }
});

router.post("/", async (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined"
  ) {
    res.redirect("/signout");
  } else {
    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

    var {
      Granting_Authority_Selected,
      GA_Roles_Selected,
      button_value,
    } = req.body;
    No_Selected_text = "";
    No_Selected_GA = false;
    No_Selected_Role = false;
    No_Selected_id = "";
    console.log("button_value  : " + button_value);
    console.log("Granting_Authority_Selected", Granting_Authority_Selected);
    if (button_value == "GASelected") {
      GA_Selected = Granting_Authority_Selected;
      ssn.Roles_Selected = "";
      if (!Granting_Authority_Selected) {
        No_Selected_text = "Please select GA";
        No_Selected_GA = true;
        No_Selected_Role = false;
        No_Selected_id = "#sort-ga";
        res.render("bulkupload/user-select", {
          No_Selected_text,
          No_Selected_GA,
          No_Selected_Role,
          No_Selected_id,
        });
      }
    } else if (button_value == "RoleSelected") {
      ssn.Roles_Selected = GA_Roles_Selected;
      console.log("ssn.Roles_Selected roles:" + ssn.Roles_Selected);
      GA_Selected = "";
      if (!GA_Roles_Selected) {
        No_Selected_text = "Please select Role";
        No_Selected_GA = false;
        No_Selected_Role = true;
        No_Selected_id = "#sort-by-roles";
        res.render("bulkupload/user-select", {
          No_Selected_text,
          No_Selected_GA,
          No_Selected_Role,
          No_Selected_id,
        });
      }
    }

    if (Granting_Authority_Selected) {
      for (var i = 0; i < ssn.apiroles_total_objects; i++) {
        if (GA_Selected == ssn.apiroles_extract[i].gaName) {
          // console.log("gaName id1 : " + ssn.apiroles_extract[i].azGrpId);
          GA_Object_Id = ssn.apiroles_extract[i].azGrpId;
          GA_Group_Id = ssn.apiroles_extract[i].gaId;
        }
      }
    }
    if (GA_Roles_Selected) {
      for (var i = 0; i < ssn.apiroles_total_objects; i++) {
        if (ssn.Roles_Selected == ssn.apiroles_extract[i].gaName) {
          // console.log("gaName id2 : " + ssn.apiroles_extract[i].azGrpId);
          GA_Object_Id = ssn.apiroles_extract[i].azGrpId;
          GA_Group_Id = ssn.apiroles_extract[i].gaId;
        }
      }
    }

    console.log("GA_Object_Id", GA_Object_Id);
    if (Granting_Authority_Selected || GA_Roles_Selected) {
      try {
        const apidata = await axios.get(
          beis_url_accessmanagement + "/usermanagement/groups/" + GA_Object_Id,
          ssn.UserPrincileObjectGlobal
        );
        // console.log(`Status: ${apidata.status}`);
        // API_response_code = `${apidata.status}`;
        // console.log("API_response_code: try" + API_response_code);
        console.log("Body: ", apidata.data);
        ssn.GAUserList = apidata.data;
        ssn.GAUserList_Empty = Object.keys(ssn.GAUserList.value).length;
        // console.log(" ssn.GAUserList_Empty : " + ssn.GAUserList_Empty);
        isUserSelectIsPrimaryCall = false;

        ssn.User_Role_Global = "";
        ssn.GA_Name_User_Global = "";
        ssn.Full_Name_Global = "";
        ssn.Last_Name_Global = "";
        ssn.Email_Id_Global = "";
        ssn.Phone_Number_Global = "";

        res.render("bulkupload/user-select", {
          No_Selected_text,
          No_Selected_GA,
          No_Selected_Role,
          No_Selected_id,
        });
      } catch (err) {
        if (err.toString().includes("500"))
          res.render("bulkupload/notAvailable");
        else if (err.toString().includes("404")) {
          No_Selected_text = "";
          No_Selected_GA = false;
          No_Selected_Role = false;
          No_Selected_id = "";
          ssn.GAUserList_Empty = 0;
          res.render("bulkupload/user-select", {
            No_Selected_text,
            No_Selected_GA,
            No_Selected_Role,
            No_Selected_id,
          });
        } else if (err.toString().includes("401"))
          res.render("bulkupload/notAuthorized");
        response_error_message = err;
        console.log("message error : " + err);
        console.log("response_error_message catch : " + response_error_message);
      }
    }
  }
});

module.exports = router;
