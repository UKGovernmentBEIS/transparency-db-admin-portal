const express = require("express");
const router = express.Router();
const axios = require("axios");
var request = require("request");

router.post("/", async (req, res) => {
  subsidy_start_date =
    scheme_issued_start_year +
    "-" +
    scheme_issued_start_month +
    "-" +
    scheme_issued_start_day;
  subsidy_end_date =
    scheme_issued_end_year +
    "-" +
    scheme_issued_end_month +
    "-" +
    scheme_issued_end_day;

  var SubsidyErrors = [];
  var SubsidyFocus = [];
  //   var Subsidy_Control_Number_Error = false;
  var Subsidy_Measure_Title_Error = false;
  var Subsidy_Adhoc_Error = false;
  var Granting_Authority_Name_Error = false;
  var scheme_issued_start_year_Error = false;
  var scheme_issued_start_month_Error = false;
  var scheme_issued_start_day_Error = false;
  var scheme_issued_end_year_Error = false;
  var scheme_issued_end_month_Error = false;
  var scheme_issued_end_day_Error = false;

  //   if (Subsidy_Full_Amount_Range_Global == "Empty") {
  //     Subsidy_Full_Amount_Range_Global_Trim = "NA";
  //   } else {
  //     Subsidy_Full_Amount_Range_Global_Trim = Subsidy_Full_Amount_Range_Global;
  //   }
  //   Subsidy_Element_Full_Amount_Global_Trim = parseFloat(
  //     Subsidy_Element_Full_Amount_Global.replace(/\,/g, "")
  //   );

  //   console.log(
  //     "Subsidy_Element_Full_Amount_Global_Trim:" +
  //       Subsidy_Element_Full_Amount_Global_Trim
  //   );

  //   if (Subsidy_Objective_Global !== "Other") {
  //     Subsidy_Objective_Other_Global = "";
  //   }

  //   if (Subsidy_Instrument_Global !== "Other") {
  //     Subsidy_Instrument_Other_Global = "";
  //   }
  const addAwardRequest = {
    adhoc: Subsidy_Adhoc_Global,
    gaName: Granting_Authority_Name_Global,
    subsidyMeasureTitle: Subsidy_Measure_Title_Global,
    legalBasisText: Legal_Basis_Global,
    gaSubsidyWebLink: Granting_Authority_URL_Global,
    gaPolicyDesc: Granting_Authority_Policy_Global,
    budget: Budget_Global,
    startDate: subsidy_start_date,
    endDate: subsidy_end_date,
  };
  //   const addAwardRequest = {
  //     subsidyControlTitle: Subsidy_Measure_Title_Global,
  //     subsidyControlNumber: Subsidy_Control_Number_Global,
  //     nationalIdType: National_ID_Type_Global,
  //     nationalId: National_ID_Number_Global,
  //     beneficiaryName: Beneficiary_Name_Global,
  //     orgSize: Size_of_the_Organisation_Global,
  //     subsidyInstrument: Subsidy_Instrument_Global,
  //     subsidyObjective: Subsidy_Objective_Global,
  //     subsidyAmountRange: Subsidy_Full_Amount_Range_Global_Trim,
  //     subsidyAmountExact: Subsidy_Element_Full_Amount_Global_Trim,
  //     legalGrantingDate: subsidy_legal_granting_date,
  //     grantingAuthorityName: Granting_Authority_Name_Global,
  //     goodsOrServices: Goods_or_Services_Global,
  //     spendingRegion: Spending_Region_Global,
  //     spendingSector: Spending_Sector_Global,
  //     subsidyObjectiveOther: Subsidy_Objective_Other_Global,
  //     subsidyInstrumentOther: Subsidy_Instrument_Other_Global,
  //   };

  //   var data = JSON.parse(JSON.stringify(addAwardRequest));
  //   console.log("request :" + JSON.stringify(data));

  try {
    const apidata = await axios.post(
      beis_url_publishing + "/scheme/add",
      addAwardRequest
    );
    console.log(`Status: ${apidata.status}`);
    API_response_code = `${apidata.status}`;
    console.log("API_response_code: " + API_response_code);
    console.log("Body: ", apidata.data);
    var add_award_response = apidata.data;
    var Additem = 0;

    if (add_award_response.totalErrors > 0) {
      add_award_response.validationErrorResult.forEach(function (i, obj) {
        if (obj.column == "subsidyControlTitle") {
          Subsidy_Measure_Title_Error = true;
          SubsidyErrors[Additem] = obj.message;
          SubsidyFocus[Additem] = "#Subsidy_Measure_Title";
          Additem = Additem + 1;
        }

        if (obj.column == "nationalId") {
          National_ID_Number_Error = true;
          SubsidyErrors[Additem] = obj.message;
          SubsidyFocus[Additem] = "#National_ID_Number";
          Additem = Additem + 1;
        }

        if (obj.column == "nationalIdType") {
          National_ID_Type_Error = true;
          SubsidyErrors[Additem] = obj.message;
          SubsidyFocus[Additem] = "#National_ID_Type";
          Additem = Additem + 1;
        }

        if (obj.column == "subsidyObjective") {
          Subsidy_Objective_Error = true;
          SubsidyErrors[Additem] = obj.message;
          SubsidyFocus[Additem] = "#Subsidy_Objective";
          Additem = Additem + 1;
        }

        if (obj.column == "SubsidyObjective-other") {
          Subsidy_Objective_Other_Error = true;
          SubsidyErrors[Additem] = obj.message;
          SubsidyFocus[Additem] = "#Subsidy_Objective_Other";
          Additem = Additem + 1;
        }

        if (obj.column == "spendingRegion") {
          Spending_Region_Error = true;
          SubsidyErrors[Additem] = obj.message;
          SubsidyFocus[Additem] = "#Spending_Region";
          Additem = Additem + 1;
        }

        if (obj.column == "subsidyInstrument") {
          Subsidy_Instrument_Error = true;
          SubsidyErrors[Additem] = obj.message;
          SubsidyFocus[Additem] = "#Subsidy_Instrument";
          Additem = Additem + 1;
        }

        if (obj.column == "SubsidyInstrument-other") {
          Subsidy_Instrument_Other_Error = true;
          SubsidyErrors[Additem] = obj.message;
          SubsidyFocus[Additem] = "#Subsidy_Instrument_Other";
          Additem = Additem + 1;
        }

        if (obj.column == "subsidyAmountExact") {
          Subsidy_Element_Full_Amount_Error = true;
          SubsidyErrors[Additem] = obj.message;
          SubsidyFocus[Additem] = "#Subsidy_Element_Full_Amount";
          Additem = Additem + 1;
        }

        if (obj.column == "grantingAuthorityName") {
          Granting_Authority_Name_Error = true;
          SubsidyErrors[Additem] = obj.message;
          SubsidyFocus[Additem] = "#Granting_Authority_Name";
          Additem = Additem + 1;
        }
        s;
      });
      //   for (i = 0; i < add_award_response.totalErrors; i++) {
      // console.log(
      //   "add_award_response:  " +
      //     obj.column
      // );
      // console.log(
      //   "add_award_response:  " +
      //     obj.message
      // );

      //   } /*end for FOR loop */

      var SubsidyArraySize = SubsidyErrors.length;
      var isAddSubsidyPrimarycall = false;

      res.render("bulkupload/addsubsidymeasures", {
        Subsidy_Measure_Title_Global,
        Subsidy_Adhoc_Global,

        Subsidy_Measure_Title_Error,
        Subsidy_Adhoc_Error,
        SubsidyErrors,
        SubsidyArraySize,
        SubsidyFocus,

        isAddSubsidyPrimarycall,
      });
    } else {
      res.render("bulkupload/subsidymeasurespublished", {
        Subsidy_Control_Number_Global,
        Subsidy_Control_Number_Global_Substring,
      });
    }
  } catch (err) {
    response_error_message = err;
    console.log("message error : " + err);
    console.log("response_error_message catch : " + response_error_message);
    // res.render('bulkupload/submitforapproval',{ Subsidy_Control_Number_Global,Subsidy_Control_Number_Global_Substring })
  }
});

module.exports = router;
