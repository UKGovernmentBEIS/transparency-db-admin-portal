
const express = require('express');
const router = express.Router();

router.get('/',(req, res) => {

  Subsidy_Control_Number_Global ='';
    Subsidy_Measure_Title_Global='';
    Subsidy_Objective_Global='';
    Subsidy_Instrument_Global='';
    Subsidy_Element_Full_Amount_Global='';
    National_ID_Type_Global='';
    National_ID_Number_Global='';
    Beneficiary_Name_Global='';
    Size_of_the_Organisation_Global='';
    Granting_Authority_Name_Global='';
    Legal_Granting_Date_Day_Global='';
    Legal_Granting_Date_Month_Global='';
    Legal_Granting_Date_Year_Global='';
    Goods_or_Services_Global='';
    Spending_Region_Global='';
    Spending_Sector_Global='';
 
    var isAddSubsidyPrimarycall = true;
    res.render('bulkupload/addsubsidyaward', { isAddSubsidyPrimarycall }) 
  });
  
   
  router.post('/',(req, res) => {
    res.render('bulkupload/addsubsidyaward')
  })

module.exports = router;



