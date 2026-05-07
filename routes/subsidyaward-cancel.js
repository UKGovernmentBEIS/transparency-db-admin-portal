// ********************************************************************
// Gov.UK transparency subsidy award cancel module
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
    res.set("Content-Security-Policy", [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'"
    ].join(";"));

    res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    res.set("Referrer-Policy", "strict-origin-when-cross-origin");
    res.set("Cross-Origin-Resource-Policy", "same-origin");
    res.set("Cross-Origin-Opener-Policy", "same-origin");
    res.set("Cross-Origin-Embedder-Policy", "require-corp");
    console.log("awardnumber : " + awardnumber);

    var awardendpoint =
      beis_url_accessmanagement + "/searchResults/award/" + awardnumber;
    nodata = false;
    try {
      const awardapidata = await axios.get(
        awardendpoint,
        ssn.UserPrincileObjectGlobal
      );
      console.log(`Status: ${awardapidata.status}`);
      console.log("Body: ", awardapidata.data);
      fetchawarddetails = awardapidata.data;
      res.render("bulkupload/subsidyaward-fetch", { nodata });
    } catch (err) {
      console.log(err);
      if (err.toString().includes("401"))
        res.render("bulkupload/notAuthorized");
      else if (err.toString().includes("500"))
        res.render("bulkupload/notAvailable");
      else if (err.toString().includes("404")) {
        nodata = true;
        res.render("bulkupload/subsidyaward-fetch", { nodata });
      }
    }
  }
});

module.exports = router;
