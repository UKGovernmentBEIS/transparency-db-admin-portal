// ********************************************************************
// Gov.UK transparency Subsidy feedback form submit module
// ********************************************************************

const express = require("express");
const axios = require("axios");
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
    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    var data = {
      feedBack: req.body.feedback,
      comment: req.body.comment,
    };

    console.log("feedback", JSON.stringify(data));
    console.log("url", beis_url_accessmanagement + "/usermanagement/feedback");
    try {
      const apidata = await axios.post(
        beis_url_accessmanagement + "/usermanagement/feedback",
        {
          feedBack: req.body.feedback,
          comments: req.body.comment,
        }
      );
      res.render("bulkupload/feedbacksubmit");
    } catch (err) {
      if (err.toString().includes("401"))
        res.render("bulkupload/notAuthorized");
      else if (err.toString().includes("500"))
        res.render("bulkupload/notAvailable");
      console.log("feedback message error : " + err);
    }
  }
});

module.exports = router;
