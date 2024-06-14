// ********************************************************************
// Gov.UK transparency subsidy scheme edit module
// ********************************************************************

const express = require("express");
var session = require("express-session");
const router = express.Router();

const axios = require("axios");
var request = require("request");

router.get("/", async (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined"
  ) {
    res.redirect("/signout");
  } else {
    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_publicsearch);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

    console.log("req.query.scheme: " + req.query.scheme);
    scnumber = req.query.scheme;
    edit = req.query.editsc;
    if (edit == "No") {
      console.log("scnumber : " + scnumber);
      var measureendpoint = beis_url_searchscheme + "/scheme/" + scnumber;

      try {
        const measureapidata = await axios.get(
          measureendpoint,
          ssn.UserPrincileObjectGlobal
        );
        console.log(`Status: ${measureapidata.status}`);
        console.log("Body: ", measureapidata.data);
        // ssn.searchmeasuredetails = measureapidata.data;

        ssn.Subsidy_Adhoc_Global = measureapidata.data.adhoc;
        ssn.scNumber_Global = measureapidata.data.scNumber;
        ssn.Granting_Authority_Name_Global = measureapidata.data.gaName;
        ssn.Subsidy_Measure_Title_Global =
          measureapidata.data.subsidyMeasureTitle;
        ssn.Legal_Basis_Global = measureapidata.data.legalBasisText;
        ssn.Granting_Authority_URL_Global =
          measureapidata.data.gaSubsidyWebLink;
        ssn.Granting_Authority_Policy_Global =
          measureapidata.data.gaSubsidyWebLinkDescription;
        ssn.Budget_Global = measureapidata.data.budget;

        ssn.Maximum_Amount_Under_Scheme_Global = ssn.searchmeasuredetails.maximumAmountUnderScheme;

        Scheme_Confirmation_Date = ssn.searchmeasuredetails.confirmationDate;
        Scheme_Start_Date = ssn.searchmeasuredetails.startDate;
        Scheme_End_Date = ssn.searchmeasuredetails.endDate;
        ssn.Has_No_End_Date = measureapidata.data.hasNoEndDate;
        ssn.Subsidy_Scheme_Description_Global = measureapidata.data.subsidySchemeDescription;
        ssn.Spending_Sector_Array_Global = measureapidata.data.spendingSectorArray;

        ssn.Subsidy_Scheme_Interest_Global = measureapidata.data.subsidySchemeInterest;

        ssn.spendingsector_accommodation_Global = false;
        ssn.spendingsector_activities_of_extraterritorial_Global = false;
        ssn.spendingsector_undifferentiated_goods_Global = false;
        ssn.spendingsector_administrative_Global = false;
        ssn.spendingsector_agriculture_forestry_and_fishing_Global = false;
        ssn.spendingsector_arts_entertainment_Global = false;
        ssn.spendingsector_construction_Global = false;
        ssn.spendingsector_education_Global = false;
        ssn.spendingsector_Electricity_gas_steam_and_air_conditioning_supply_Global = false;
        ssn.spendingsector_financial_and_insurance_activities_Global = false;
        ssn.spendingsector_human_health_Global = false;
        ssn.spendingsector_information_and_communication_Global = false;
        ssn.spendingsector_Manufacturing_Global = false;
        ssn.spendingsector_mining_and_quarrying_Global = false;
        ssn.spendingsector_Other_service_activities_Global = false;
        ssn.spendingsector_professional_Global = false;
        ssn.spendingsector_public_administration_Global = false;
        ssn.spendingsector_real_estate_activities_Global = false;
        ssn.spendingsector_transportation_and_storage_Global = false;
        ssn.spendingsector_water_supply_Global = false;
        ssn.spendingsector_wholesale_and_retail_trade_Global = false;

        ssn.Purpose_Array_Global = measureapidata.data.purposeArray
        ssn.Purpose_Array_Other_Global = JSON.parse(ssn.searchmeasuredetails.purpose).slice(-1).toString().replace('Other - ', '')

        ssn.purpose_culture_or_heritage_Global = false;
        ssn.purpose_employment_Global = false;
        ssn.purpose_energy_efficiency_Global = false;
        ssn.purpose_environmental_protection_Global = false;
        ssn.purpose_infrastructure_Global = false;
        ssn.purpose_regional_development_Global = false;
        ssn.purpose_rescue_subsidy_Global = false;
        ssn.purpose_research_and_development_Global = false;
        ssn.purpose_training_Global = false;
        ssn.purpose_other_Global = null;


        var spendingSectorArray = new Array();
        if(ssn.searchmeasuredetails.spendingSectors != null){
          spendingSectorArray = JSON.parse(ssn.searchmeasuredetails.spendingSectors);
        }
        spendingSectorArray.forEach(function(spendingSector){
          switch(spendingSector) {
            case "Accommodation and food service activities":
              ssn.spendingsector_accommodation_Global = true;
              break;
            case "Activities of extraterritorial organisations and bodies":
              ssn.spendingsector_activities_of_extraterritorial_Global = true;
              break;
            case "Activities of households as employers; undifferentiated goods- and services-producing activities of households for own use":
              ssn.spendingsector_undifferentiated_goods_Global = true;
              break;
            case "Administrative and support service activities":
              ssn.spendingsector_administrative_Global = true;
              break;
            case "Agriculture, forestry and fishing":
              ssn.spendingsector_agriculture_forestry_and_fishing_Global = true;
              break;
            case "Arts, entertainment and recreation":
              ssn.spendingsector_arts_entertainment_Global = true;
              break;
            case "Construction":
              ssn.spendingsector_construction_Global = true;
              break;
            case "Education":
              ssn.spendingsector_education_Global = true;
              break;
            case "Electricity, gas, steam and air conditioning supply":
              ssn.spendingsector_Electricity_gas_steam_and_air_conditioning_supply_Global = true;
              break;
            case "Financial and insurance activities":
              ssn.spendingsector_financial_and_insurance_activities_Global = true;
              break;
            case "Human health and social work activities":
              ssn.spendingsector_human_health_Global = true;
              break;
            case "Information and communication":
              ssn.spendingsector_information_and_communication_Global = true;
              break;
            case "Manufacturing":
              ssn.spendingsector_Manufacturing_Global = true;
              break;
            case "Mining and quarrying":
              ssn.spendingsector_mining_and_quarrying_Global = true;
              break;
            case "Other service activities":
              ssn.spendingsector_Other_service_activities_Global = true;
              break;
            case "Professional, scientific and technical activities":
              ssn.spendingsector_professional_Global = true;
              break;
            case "Public administration and defence; compulsory social security":
              ssn.spendingsector_public_administration_Global = true;
              break;
            case "Real estate activities":
              ssn.spendingsector_real_estate_activities_Global = true;
              break;
            case "Transportation and storage":
              ssn.spendingsector_transportation_and_storage_Global = true;
              break;
            case "Water supply; sewerage, waste management and remediation activities":
              ssn.spendingsector_water_supply_Global = true;
              break;
            case "Wholesale and retail trade; repair of motor vehicles and motorcycles":
              ssn.spendingsector_wholesale_and_retail_trade_Global = true;
              break;
          }
        });

        var purposeArray = new Array();
        if(ssn.searchmeasuredetails.purpose != null){
          purposeArray = JSON.parse(ssn.searchmeasuredetails.purpose);
        }
        purposeArray.forEach(function(purpose){
          switch(purpose) {
            case "Culture or Heritage":
              ssn.purpose_culture_or_heritage_Global = true;
              break;
            case "Employment":
              ssn.purpose_employment_Global = true;
              break;
            case "Energy efficiency":
              ssn.purpose_energy_efficiency_Global = true;
              break;
            case "Environmental protection":
              ssn.purpose_environmental_protection_Global = true;
              break;
            case "Infrastructure":
              ssn.purpose_infrastructure_Global = true;
              break;
            case "Regional development":
              ssn.purpose_regional_development_Global = true;
              break;
            case "Rescue and restructuring subsidy":
              ssn.purpose_rescue_subsidy_Global = true;
              break;
            case "Research and development":
              ssn.purpose_research_and_development_Global = true;
              break;
            case "Training":
              ssn.purpose_training_Global = true;
              break;
            case "Other - " + ssn.Purpose_Array_Other_Global:
              ssn.purpose_other_Global = ssn.Purpose_Array_Other_Global;
              break;
          }
        });

        var month = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        var date = Scheme_Confirmation_Date.split(" ");
        if (Scheme_Confirmation_Date == '') {
          ssn.Scheme_Confirmation_Month_Global = '';
        } else {
          ssn.Scheme_Confirmation_Month_Global =
          month.indexOf(date[1]) + 1 < 10
            ? "0" + (month.indexOf(date[1]) + 1)
            : month.indexOf(date[1]) + 1;
        }
        ssn.Scheme_Confirmation_Day_Global = date[0];
        ssn.Scheme_Confirmation_Year_Global = date[2];


        var date = Scheme_Start_Date.split(" ");
        ssn.Scheme_Start_Month_Global =
          month.indexOf(date[1]) + 1 < 10
            ? "0" + (month.indexOf(date[1]) + 1)
            : month.indexOf(date[1]) + 1;
        ssn.Scheme_Start_Day_Global = date[0];
        ssn.Scheme_Start_Year_Global = date[2];

        var date = Scheme_End_Date.split(" ");
        ssn.Scheme_End_Month_Global =
          month.indexOf(date[1]) + 1 < 10
            ? "0" + (month.indexOf(date[1]) + 1)
            : month.indexOf(date[1]) + 1;
        ssn.Scheme_End_Day_Global = date[0];
        ssn.Scheme_End_Year_Global = date[2];

        ssn.SubsidyArraySize = 0;

        const formatter = new Intl.NumberFormat("en-GB");
        Budget = measureapidata.data.budget;
        if (measureapidata.data.budget.includes(","))
          Budget = measureapidata.data.budget.split(",").join("");
        formatedCurrency = formatter.format(Budget);

        ssn.Subsidy_Measure_Title_Error = false;
        ssn.Subsidy_Measure_Title_255_Error = false;
        ssn.Granting_Authority_URL_255_Error = false;
        ssn.Granting_Authority_Policy_255_Error = false;
        ssn.Subsidy_Adhoc_Error = false;
        ssn.Granting_Authority_Name_Error = false;
        ssn.scheme_issued_start_day_Error = false;
        ssn.scheme_issued_start_month_Error = false;
        ssn.scheme_issued_start_year_Error = false;
        ssn.Legal_Basis_Error = false;
        ssn.Granting_Authority_URL_Error = false;
        ssn.Granting_Authority_Name_Inactive_Error = false;
        ssn.Granting_Authority_Policy_Error = false;
        ssn.Budget_Error = false;
        ssn.scheme_issued_end_day_Error = false;
        ssn.scheme_issued_end_day_lesser_Error = false;
        ssn.scheme_issued_end_month_Error = false;
        ssn.scheme_issued_end_year_Error = false;
        ssn.Subsidy_Scheme_Description_Error = false;
        ssn.Subsidy_Scheme_Description_Length_Error = false;
        ssn.scheme_issued_confirmation_day_Error = false;
        ssn.scheme_issued_confirmation_month_Error = false;
        ssn.scheme_issued_confirmation_year_Error = false;
        ssn.Maximum_Amount_Under_Scheme_255_Error = false;
        ssn.Subsidy_Of_Particular_Interest_Error = false;

        if (ssn.dashboard_roles !== "Granting Authority Encoder") {
          res.render("bulkupload/subsidymeasures-edit", { formatedCurrency });
        } else {
          res.render("bulkupload/notAuthorized");
        }
      } catch (err) {
        console.error(err);
        if (err.toString().includes("500"))
          res.render("bulkupload/notAvailable");
        else if (err.toString().includes("401"))
          res.render("bulkupload/notAuthorized");
      }
    } else {
      var month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      ssn.Scheme_Confirmation_Month_Global =
        month.indexOf(ssn.GetConfirmationMonthName) + 1 < "10"
          ? "0" + (month.indexOf(ssn.GetConfirmationMonthName) + 1)
          : month.indexOf(ssn.GetConfirmationMonthName) + 1;

      ssn.Scheme_Start_Month_Global =
        month.indexOf(ssn.GetMonthName) + 1 < "10"
          ? "0" + (month.indexOf(ssn.GetMonthName) + 1)
          : month.indexOf(ssn.GetMonthName) + 1;

      ssn.Scheme_End_Month_Global =
        month.indexOf(ssn.GetEndMonthName) + 1 < "10"
          ? "0" + (month.indexOf(ssn.GetEndMonthName) + 1)
          : month.indexOf(ssn.GetEndMonthName) + 1;

      const formatter = new Intl.NumberFormat("en-GB");

      if (formatedCurrency.includes(","))
        Budget = formatedCurrency.split(",").join("");
      formatedCurrency = formatter.format(Budget);
      if (ssn.dashboard_roles !== "Granting Authority Encoder") {
        res.render("bulkupload/subsidymeasures-edit", { formatedCurrency });
      } else {
        res.render("bulkupload/notAuthorized");
      }
    }
  }
});

module.exports = router;
