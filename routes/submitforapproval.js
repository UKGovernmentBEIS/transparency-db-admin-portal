
const express = require("express");
const router = express.Router();
const axios = require("axios");
var request = require("request");


router.post('/',async(req, res) => {

  if (typeof  Subsidy_Full_Amount_Range_Global == 'undefined') {  Subsidy_Full_Amount_Range_Global =""; };
  if (typeof  Subsidy_Element_Full_Amount_Global == 'undefined') {  Subsidy_Element_Full_Amount_Global =""; };
    
const addAwardRequest = 
{
  
  "subsidyControlTitle": Subsidy_Measure_Title_Global,
  "subsidyControlNumber": Subsidy_Control_Number_Global,
  "nationalIdType": National_ID_Type_Global,
  "nationalId": National_ID_Number_Global,
  "beneficiaryName": Beneficiary_Name_Global,
  "orgSize": Size_of_the_Organisation_Global,
  "subsidyInstrument": Subsidy_Instrument_Global,
  "subsidyObjective": Subsidy_Objective_Global,  
  "subsidyAmountRange": Subsidy_Full_Amount_Range_Global,
  "subsidyAmountExact": Subsidy_Element_Full_Amount_Global,
  "legalGrantingDate": "22-Jan-18",
  "grantingAuthorityName":  Granting_Authority_Name_Global,
  "goodsOrServices": Goods_or_Services_Global ,
  "spendingRegion": Spending_Region_Global,
  "spendingSector": Spending_Sector_Global,
  "subsidyObjectiveOther": "",
  "subsidyInstrumentOther": ""
}


var data = JSON.parse(JSON.stringify(addAwardRequest));
console.log("request :" + JSON.stringify(data));
    
      try {
          const apidata = await axios.post('https://publishing-subsidy-service.azurewebsites.net/addAward', data);
          console.log(`Status: ${apidata.status}`);
          API_response_code = `${apidata.status}`;
          console.log("API_response_code: try" + API_response_code);
          console.log('Body: ', apidata.data);
          res.render('bulkupload/submitforapproval',{ Subsidy_Control_Number_Global,Subsidy_Control_Number_Global_Substring })
           
      }
      
      catch (err) {

        response_error_message = err;
        console.log("message error : " + err);
        console.log("response_error_message catch : " + response_error_message );
        res.render('bulkupload/submitforapproval',{ Subsidy_Control_Number_Global,Subsidy_Control_Number_Global_Substring })
           
     
      }
  
  
  });
  

module.exports = router;



