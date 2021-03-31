const express = require("express");
var session = require("express-session");
const router = express.Router();

router.get("/", (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined" ||
    req.session.cookie.maxAge <= 0
  ) {
    res.redirect("/signout");
  } else {
    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

    res.render("bulkupload/reviewdetail", {
      ssn,
      // ssn.Subsidy_Control_Number_Global,
      // ssn.Subsidy_Control_Number_Global_Substring,
      // ssn.Subsidy_Measure_Title_Global,
      // ssn.Subsidy_Objective_Global,
      // ssn.Subsidy_Instrument_Global,
      // ssn.Subsidy_Element_Full_Amount_Global,
      // ssn.Subsidy_Full_Amount_Range_Global,
      // ssn.National_ID_Type_Global,
      // ssn.National_ID_Number_Global,
      // ssn.Beneficiary_Name_Global,
      // ssn.Size_of_the_Organisation_Global,
      // ssn.Granting_Authority_Name_Global,
      // ssn.Legal_Granting_Date_Day_Global,
      // ssn.Legal_Granting_Date_Month_Global,
      // ssn.Legal_Granting_Date_Year_Global,
      // ssn.Goods_or_Services_Global,
      // ssn.Spending_Region_Global,
      // ssn.Spending_Sector_Global,
    });
  }
});

module.exports = router;
