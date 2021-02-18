const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  

  beis_url_publishing = "https://dev-beis-tp-db-publishing-subsidies-service.azurewebsites.net";
  beis_url_accessmanagement = "https://dev-beis-tp-db-accessmanagement-service-app.azurewebsites.net";
  beis_url_publicsearch = "https://dev-beis-tp-db-public-search-service.azurewebsites.net";
  
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  

  res.render("bulkupload/bulkuploadsubsidydefault");
});

module.exports = router;
