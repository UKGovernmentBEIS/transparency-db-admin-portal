const express = require("express");
var session = require("express-session");
const router = express.Router();

const axios = require("axios");
var request = require("request");

router.get("/", async (req, res) => {
  ssn = req.session;
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  try {
    console.log("scNumber_Global", scNumber_Global);
    const deleteUser = await axios.put(
      beis_url_searchscheme + `/scheme/update/${scNumber_Global}`,
      {
        status: "Inactive",
      },
      ssn.UserPrincileObjectGlobal
    );

    console.log(`Status: ${deleteUser.status}`);

    res.render("bulkupload/subsidymeasure-deactivated-successfully", {
      scNumber_Global,
    });
  } catch (err) {
    console.log("message error : " + err);
    if (err.toString().includes("500")) res.render("bulkupload/notAvailable");
    else if (err.toString().includes("401"))
      res.render("bulkupload/notAuthorized");
  }
});

module.exports = router;
