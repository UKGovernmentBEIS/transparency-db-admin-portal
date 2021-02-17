const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/", async (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  gaId = req.body.gaid;
  Environment_variable = process.argv[2];
  const env = Environment_variable.split("=");
  const gaName = req.body.ganame.replace(/ /g, "");
  try {
    const apidata = await axios.get(
      `https://dev-beis-tp-db-ga-schemes-service.azurewebsites.net/grantingAuthority/${gaId}`,
      {
        name: req.body.ganame,
        az_group_name: env[1] + "_" + gaName,
      }
    );
    console.log("Status : " + apidata.status);
    res.render("bulkupload/grantingauthority-deactivated-successfully", {
      gaId,
    });
  } catch (err) {
    console.log("message error : " + err);
    // res.render("publicusersearch/noresults");
  }
});

module.exports = router;
