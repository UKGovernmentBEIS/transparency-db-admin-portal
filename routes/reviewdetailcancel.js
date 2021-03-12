const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  res.render("bulkupload/reviewdetail", {
    Subsidy_Control_Number_Global,
    Subsidy_Control_Number_Global_Substring,
    Subsidy_Measure_Title_Global,
    Subsidy_Objective_Global,
    Subsidy_Instrument_Global,
    Subsidy_Element_Full_Amount_Global,
    Subsidy_Full_Amount_Range_Global,
    National_ID_Type_Global,
    National_ID_Number_Global,
    Beneficiary_Name_Global,
    Size_of_the_Organisation_Global,
    Granting_Authority_Name_Global,
    Legal_Granting_Date_Day_Global,
    Legal_Granting_Date_Month_Global,
    Legal_Granting_Date_Year_Global,
    Goods_or_Services_Global,
    Spending_Region_Global,
    Spending_Sector_Global,
    GetMonthName,
  });
});

module.exports = router;
