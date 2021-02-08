const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/", async (req, res) => {
  // const data = {
  //   name: req.body.GaName,
  // };
  if (req.body.editReview == "true") {
    const gaID = req.body.grantingAuthorityID;
    try {
      const apidata = await axios.put(
        `http://dev-beis-tp-db-ga-schemes-service.azurewebsites.net/grantingAuthority/${gaID}`,
        {
          name: req.body.grantingAuthorityName,
        }
      );

      console.log("Status : " + apidata.status);
      res.set("X-Frame-Options", "DENY");
      res.set("X-Content-Type-Options", "nosniff");
      res.set("Content-Security-Policy", 'frame-ancestors "self"');
      res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
      res.set(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
      const review = req.body.editReview;
      res.render("bulkupload/grantingauthority-addsuccessfully", {
        gaID,
        review,
      });
    } catch (err) {
      response_error_message = err;
      console.log("message error : " + err);
      console.log("response_error_message catch : " + response_error_message);
      // res.render('publicusersearch/noresults');
    }
  } else {
    try {
      const apidata = await axios.post(
        "http://dev-beis-tp-db-ga-schemes-service.azurewebsites.net/grantingAuthority",
        {
          name: req.body.GaName,
        },
        {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        }
      );
      const gaID = req.body.GaId;
      console.log("Status : " + apidata.status);
      res.set("X-Frame-Options", "DENY");
      res.set("X-Content-Type-Options", "nosniff");
      res.set("Content-Security-Policy", 'frame-ancestors "self"');
      res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
      res.set(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
      const review = "";
      res.render("bulkupload/grantingauthority-addsuccessfully", {
        gaID,
        review,
      });
    } catch (err) {
      response_error_message = err;
      console.log("message error : " + err);
      console.log("response_error_message catch : " + response_error_message);
      // res.render('publicusersearch/noresults');
    }
  }
});

module.exports = router;
