const express = require("express");
var session = require("express-session");
const router = express.Router();

router.get("/", (req, res) => {
  ssn = req.session;
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  req.session.destroy(function (err) {
    if (err) {
      console.log("Logout Error", err);
    } else {
      var cookei_var = req.headers.cookie;
      var cookiesList = cookei_var.split(";");
      var CookeiNames = [];

      cookiesList.forEach(function (items) {
        console.log("itesm:" + items);
        strPos = items.indexOf("=") - 1;

        CookeiNameExtract = items.substr(1, strPos);
        console.log("CookeiNameExtract" + CookeiNameExtract);
        CookeiNames.push(items);
        // req.clearCookie(items,{path:'/'});
        // res.clearCookie(items,{path:'/'});

        res.clearCookie(CookeiNameExtract, {
          path: "/",
          domain: beis_redirect_url,
        });

        // res.clearCookie = function clearCookie(CookeiNameExtract, options) {
        //   var opts = merge({ expires: new Date(1), path: '/' }, options);

        //   return this.cookie(CookeiNameExtract, '', opts); }
      });

      CookeiNames.forEach(function (items1) {
        console.log("itesm1:" + items1);
      });

      //res.set('x-ms-token-aad-id-token', '');
      res.setHeader("x-ms-token-aad-id-token", "");
      res.setHeader("AppServiceAuthSession", "");
      res.redirect(
        beis_redirect_url + "/.auth/logout"
        // "https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=" + beis_redirect_url
      );
      console.log("cookies-clear", req.headers.cookie);
      //   cookies.set('testtoken', {expires: Date.now()});
      //   res.render("bulkupload/notAuthorized");
    }
  });
});

module.exports = router;
