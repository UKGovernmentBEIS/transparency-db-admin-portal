const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {



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
      Spending_Sector
       } = req.body;

       
       console.log("Subsidy_Instrument :" + Subsidy_Instrument);
       console.log("Spending_Sector :" + Spending_Sector);
  
      Subsidy_Control_Number_Global= Subsidy_Control_Number;
      Subsidy_Measure_Title_Global = Subsidy_Measure_Title;
      Subsidy_Objective_Global = Subsidy_Objective;
      Subsidy_Instrument_Global= Subsidy_Instrument;
      Subsidy_Element_Full_Amount_Global = Subsidy_Element_Full_Amount;
      Subsidy_Full_Amount_Range_Global = Subsidy_Full_Amount_Range;
      National_ID_Type_Global = National_ID_Type;
      National_ID_Number_Global = National_ID_Number;
      Beneficiary_Name_Global = Beneficiary_Name;
      Size_of_the_Organisation_Global = Size_of_the_Organisation; 
      Granting_Authority_Name_Global = Granting_Authority_Name;
      Legal_Granting_Date_Day_Global = Legal_Granting_Date_Day;
      Legal_Granting_Date_Month_Global = Legal_Granting_Date_Month;
      Legal_Granting_Date_Year_Global = Legal_Granting_Date_Year;
      Goods_or_Services_Global = Goods_or_Services;
      Spending_Region_Global = Spending_Region;
      Spending_Sector_Global = Spending_Sector;

      Subsidy_Control_Number_Global_Substring = Subsidy_Control_Number_Global.substring(2, 10);

       if (Legal_Granting_Date_Month_Global == 01 ) { GetMonthName =  "January" };
       if (Legal_Granting_Date_Month_Global == 02 ) { GetMonthName =  "February" };
       if (Legal_Granting_Date_Month_Global == 03 ) { GetMonthName =  "March" };
       if (Legal_Granting_Date_Month_Global == 04 ) { GetMonthName =  "April" };
       if (Legal_Granting_Date_Month_Global == 05 ) { GetMonthName =  "May" };
       if (Legal_Granting_Date_Month_Global == 06 ) { GetMonthName =  "June" };
       if (Legal_Granting_Date_Month_Global == 07 ) { GetMonthName =  "July" };
       if (Legal_Granting_Date_Month_Global == 08 ) { GetMonthName =   "August"};
       if (Legal_Granting_Date_Month_Global == 09 ) { GetMonthName = "September" };
       if (Legal_Granting_Date_Month_Global == 10 ) { GetMonthName = "October"};
       if (Legal_Granting_Date_Month_Global == 11 ) { GetMonthName = "November"};
       if (Legal_Granting_Date_Month_Global == 12 ) { GetMonthName =  "December"};
       

    console.log("Legal_Granting_Date_Month_Global" + GetMonthName);


  res.render("bulkupload/subsidyaward-cancel");
});

module.exports = router;
