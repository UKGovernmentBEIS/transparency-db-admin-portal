const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  try {
    const apidata = await axios.get(
      beis_url_accessmanagement + "/users/" + user_id,
      UserPrincileObjectGlobal
    );
    console.log(`Status: ${apidata.status}`);
    console.log("Body: ", apidata.data);
    GAUserList = apidata.data;

    res.render("bulkupload/user-account");
  } catch (err) {
    response_error_message = err;
    console.log("message error : " + err);
    console.log("response_error_message catch : " + response_error_message);
  }
});

module.exports = router;
