const express = require("express");
var session = require("express-session");
const router = express.Router();

const axios = require("axios");
var request = require("request");

router.get("/", async (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined" ||
    req.session.cookie.maxAge <= 0
  ) {
    res.redirect("/signout");
  } else {
    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

    try {
      const deleteUser = await axios.delete(
        beis_url_accessmanagement +
          "/usermanagement/deleteuser/" +
          ssn.Delete_UserId,
        ssn.UserPrincileObjectGlobal
      );

      console.log(`Status: ${deleteUser.status}`);
      API_response_code = `${deleteUser.status}`;
      console.log("API_response_code: try" + API_response_code);
      console.log("Body: ", deleteUser.data);
      deleteUser_extract = deleteUser.data;
      res.render("bulkupload/user-deactivated-successfully");
    } catch (err) {
      console.log("message error : " + err);
      if (err.toString().includes("500")) res.render("bulkupload/notAvailable");
      else if (err.toString().includes("401"))
        res.render("bulkupload/notAuthorized");
    }
  }
});

module.exports = router;
