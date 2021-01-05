// ********************************************************************
// Gov.UK public user search page outing
// ********************************************************************

const express = require("express");
const router = express.Router();
const axios = require("axios");
var request = require("request");

router.get("/", async (req, res) => {
  console.log("req.query.page: " + req.query.page);
  var isAddSubsidyPrimarycall = false;
  var GetMonthName;
  var SubsidyErrors = [];
  var SubsidyFocus = [];
  var Additem = 0;
  var SubsidyArraySize = 0;
  var Subsidy_Control_Number_Error = false;
  var Subsidy_Measure_Title_Error = false;
  var Subsidy_Objective_Error = false;
  var Subsidy_Instrument_Error = false;
  var Subsidy_Element_Full_Amount_Error = false;
  var Subsidy_Full_Amount_Range_Error = false;
  var National_ID_Type_Error = false;
  var National_ID_Number_Error = false;
  var Beneficiary_Name_Error = false;
  var Size_of_the_Organisation_Error = false;
  var Granting_Authority_Name_Error = false;
  var Legal_Granting_Date_Day_Error = false;
  var Legal_Granting_Date_Month_Error = false;
  var Legal_Granting_Date_Year_Error = false;
  var Goods_or_Services_Error = false;
  var Spending_Region_Error = false;
  var Spending_Sector_Error = false;

  const {
    Subsidy_Control_Number,
    Subsidy_Measure_Title,
    Subsidy_Objective,
    Subsidy_Instrument,
    Subsidy_Element_Full_Amount,
    Subsidy_Full_Amount_Range,
    National_ID_Type,
    National_ID_Number,
    Beneficiary_Name,
    Size_of_the_Organisation,
    Granting_Authority_Name,
    Legal_Granting_Date_Day,
    Legal_Granting_Date_Month,
    Legal_Granting_Date_Year,
    Goods_or_Services,
    Spending_Region,
    Spending_Sector,
  } = req.body;
  //   awardnumber = req.query.page;

  //   console.log("awardnumber : " + awardnumber);

  //   try {
  //     const awardapidata = await axios.get(
  //       "http://subsidy-search-service.azurewebsites.net/searchResults/award/" +
  //         awardnumber
  //     );
  //     console.log(`Status: ${awardapidata.status}`);
  //     console.log("Body: ", awardapidata.data);
  //     searchawarddetails = awardapidata.data;
  //     res.render("bulkupload/subsidyaward-edit");
  //   } catch (err) {
  //     console.error(err);
  //   }
});

module.exports = router;
