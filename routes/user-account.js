// ********************************************************************
// Gov.UK transparency user account list module
// ********************************************************************

const express = require("express");
const axios = require("axios");
var session = require("express-session");
const router = express.Router();

var jwt_decode = require("jwt-decode");
const utils = require("../utils");

router.get("/", async (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined"
  ) {
    res.redirect("/signout");
  } else {
    utils.setSecurityHeaders(res, beis_url_accessmanagement);

    // var id_token = req.header("x-ms-token-aad-id-token");
    // console.log("id_token " + id_token);
    // var id_token_decoded = jwt_decode(id_token);
    // var user_id = id_token_decoded.oid;
    console.log("User_id: " + ssn.user_id);
    // ssn.dashboard_user_name = id_token_decoded.name;
    console.log("user name :" + ssn.dashboard_user_name);

    try {
      const apidata = await axios.get(
        beis_url_accessmanagement + "/usermanagement/users/" + ssn.user_id,
        ssn.UserPrincileObjectGlobal
      );
      console.log(`Status: ${apidata.status}`);
      console.log("Body: ", apidata.data);
      ssn.Full_Name_Global = apidata.data.givenName;
      ssn.Last_Name_Global = apidata.data.surname;
      if (!apidata.data.mail)
        ssn.Email_Id_Global = apidata.data.userPrincipalName;
      else ssn.Email_Id_Global = apidata.data.mail;
      ssn.Phone_Number_Global = apidata.data.mobilePhone;
      res.render("bulkupload/user-account", { ssn });
    } catch (err) {
      console.log("message error : " + err);
      if (err.toString().includes("500")) res.render("bulkupload/notAvailable");
      else if (err.toString().includes("401"))
        res.render("bulkupload/notAuthorized");
    }
  }
});

module.exports = router;
