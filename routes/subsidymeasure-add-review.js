const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("bulkupload/subsidymeasures-add", {
    Subsidy_Measure_Title_Global,
    Subsidy_Adhoc_Global,
    Legal_Basis_Global,
    Granting_Authority_URL_Global,
    Granting_Authority_Policy_Global,
    Budget_Global,
    Granting_Authority_Name_Global,
    Scheme_Start_Day_Global,
    Scheme_Start_Month_Global,
    Scheme_Start_Year_Global,
    Scheme_End_Day_Global,
    Scheme_End_Month_Global,
    Scheme_End_Year_Global,
  });
});

module.exports = router;
