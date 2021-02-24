const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  //   res.setHeader("set-cookie", "mycookie=; max-age=0");
  console.log("cookies", req.headers.cookie);
  var cookiesList = req.headers.cookie.split(";");
 

  cookiesList.forEach(function (items) {
    res.clearCookie(items);
   var singleCookie = items.split("=");

    // singleCookie.forEach(function (singleItem) {
      res.clearCookie(singleCookie[0]);
    });
    // var singleCookie = items.split("=");
    // singleCookie.forEach(function (singleItem) {
    //   res.clearCookie(singleItem);
    // });
  // });



  res.redirect(
    "https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=" + beis_redirect_url 
  );
  console.log("cookies", req.headers.cookie);
  //   cookies.set('testtoken', {expires: Date.now()});
  //   res.render("bulkupload/notAuthorized");
});

module.exports = router;
