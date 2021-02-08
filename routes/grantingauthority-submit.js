const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/", async (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  const gaID = req.body.GaId;
  const gaName = req.body.GaName;

  try {
    const apidata = await axios.post(
      "http://dev-beis-tp-db-ga-schemes-service.azurewebsites.net/grantingAuthority",
      {
        name: req.body.GaName,
      }
    );

    res.render("bulkupload/grantingauthority-addsuccessfully", { gaID });
  } catch (err) {
    response_error_message = err;
    console.log("message error : " + err);
    console.log("response_error_message catch : " + response_error_message);
    // res.render('publicusersearch/noresults');
  }
});

module.exports = router;
