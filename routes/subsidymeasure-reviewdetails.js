const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  isAddSubsidyPrimarycall = false;
  GetMonthName = "";
  SubsidyErrors = [];
  SubsidyFocus = [];
  Additem = 0;
  SubsidyArraySize = 0;
  var Subsidy_Measure_Title_Error = false;
  var Subsidy_Adhoc_Error = false;
  var Legal_Basis_Error = false;
  var Granting_Authority_Name_Error = false;
  var Granting_Authority_URL_Error = false;
  var Granting_Authority_Policy_Error = false;
  var Budget_Error = false;
  var scheme_issued_start_year_Error = false;
  var scheme_issued_start_month_Error = false;
  var scheme_issued_start_day_Error = false;
  var scheme_issued_end_year_Error = false;
  var scheme_issued_end_month_Error = false;
  var scheme_issued_end_day_Error = false;

  const {
    Subsidy_Adhoc,
    Granting_Authority_Name,
    Subsidy_Measure_Title,
    Legal_Basis,
    Granting_Authority_URL,
    Granting_Authority_Policy,
    Budget,
    scheme_issued_start_year,
    scheme_issued_start_month,
    scheme_issued_start_day,
    scheme_issued_end_year,
    scheme_issued_end_month,
    scheme_issued_end_day,
    buttonvalue,
  } = req.body;

  console.log("isAddSubsidyPrimarycall: " + isAddSubsidyPrimarycall);

  console.log("buttonvalue:" + buttonvalue);

  console.log("  Subsidy_Adhoc :" + Subsidy_Adhoc);

  Subsidy_Adhoc_Global = Subsidy_Adhoc;
  Granting_Authority_Name_Global = Granting_Authority_Name;
  Subsidy_Measure_Title_Global = Subsidy_Measure_Title;
  Legal_Basis_Global = Legal_Basis;
  Granting_Authority_URL_Global = Granting_Authority_URL;
  Granting_Authority_Policy_Global = Granting_Authority_Policy;
  Budget_Global = Budget;
  Granting_Authority_Name_Global = Granting_Authority_Name;
  Scheme_Start_Day_Global = scheme_issued_start_day;
  Scheme_Start_Month_Global = scheme_issued_start_month;
  Scheme_Start_Year_Global = scheme_issued_start_year;
  Scheme_End_Day_Global = scheme_issued_end_day;
  Scheme_End_Month_Global = scheme_issued_end_month;
  Scheme_End_Year_Global = scheme_issued_end_year;

  // var month = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];

  // scheme_issued_start_month =
  //   month.indexOf(scheme_issued_start_month) - 1 < 10
  //     ? "0" + (month.indexOf(scheme_issued_start_month) - 1)
  //     : month.indexOf(scheme_issued_start_month) + 1;

  if (scheme_issued_start_month == 1) {
    GetMonthName = "January";
  }
  if (scheme_issued_start_month == 2) {
    GetMonthName = "February";
  }
  if (scheme_issued_start_month == 3) {
    GetMonthName = "March";
  }
  if (scheme_issued_start_month == 4) {
    GetMonthName = "April";
  }
  if (scheme_issued_start_month == 5) {
    GetMonthName = "May";
  }
  if (scheme_issued_start_month == 6) {
    GetMonthName = "June";
  }
  if (scheme_issued_start_month == 7) {
    GetMonthName = "July";
  }
  if (scheme_issued_start_month == 8) {
    GetMonthName = "August";
  }
  if (scheme_issued_start_month == 9) {
    GetMonthName = "September";
  }
  if (scheme_issued_start_month == 10) {
    GetMonthName = "October";
  }
  if (scheme_issued_start_month == 11) {
    GetMonthName = "November";
  }
  if (scheme_issued_start_month == 12) {
    GetMonthName = "December";
  }

  console.log("scheme_issued_start_month" + GetMonthName);

  if (buttonvalue.toLowerCase() == "continue") {
    //Empty field validations

    if (!Subsidy_Measure_Title) {
      Subsidy_Measure_Title_Error = true;
      SubsidyErrors.push("Enter the subsidy sheme name");
      SubsidyFocus.push("#Subsidy_Measure_Title");
      // Additem = Additem + 1;
    }

    // if (!Subsidy_Measure_Title) {

    // }
    if (!Subsidy_Adhoc) {
      Subsidy_Adhoc_Error = true;
      SubsidyErrors.push(" Select the adhoc subsidy scheme");
      SubsidyFocus.push("#Subsidy_Adhoc");
      // Additem = Additem + 1;
    }
    if (!Legal_Basis) {
      Legal_Basis_Error = true;
      SubsidyErrors.push("Enter a valid legal basis");
      SubsidyFocus.push("#Legal_Basis");
      // Additem = Additem + 1;
    }

    if (!Granting_Authority_URL) {
      Granting_Authority_URL_Error = true;
      SubsidyErrors.push("Enter the granting authority name");
      SubsidyFocus.push("#Granting_Authority_URL");
      // Additem = Additem + 1;
    }

    if (!Granting_Authority_Policy) {
      Granting_Authority_Policy_Error = true;
      SubsidyErrors.push("Enter the granting authority name");
      SubsidyFocus.push("#Granting_Authority_Policy");
      // Additem = Additem + 1;
    }
    if (!Budget) {
      Budget_Error = true;
      SubsidyErrors.push("Enter the valid Budget");
      SubsidyFocus.push("#Granting_Authority_Policy");
      // Additem = Additem + 1;
    }
    if (!scheme_issued_start_day) {
      scheme_issued_start_day_Error = true;
      SubsidyErrors.push("     Enter the legal granting day of the date");
      SubsidyFocus.push("#scheme_issued_start_day");
      Additem = Additem + 1;
    }

    // day validation starts here

    if (scheme_issued_start_day > 31 || scheme_issued_start_day < 1) {
      scheme_issued_start_day_Error = true;
      SubsidyErrors.push("     Enter the valid legal granting day of the date");
      SubsidyFocus.push("#scheme_issued_start_day");
      Additem = Additem + 1;
    }

    if (
      scheme_issued_start_day == 31 &&
      (scheme_issued_start_month == parseInt("02", 8) ||
        scheme_issued_start_month == parseInt("04", 8) ||
        scheme_issued_start_month == parseInt("06", 8) ||
        scheme_issued_start_month == parseInt("09", 8) ||
        scheme_issued_start_month == 11)
    ) {
      scheme_issued_start_day_Error = true;
      SubsidyErrors.push("     Enter the valid day");
      SubsidyFocus.push("#scheme_issued_start_day");
      Additem = Additem + 1;
    }

    if (
      scheme_issued_start_day == 29 &&
      scheme_issued_start_month == parseInt("02", 8)
    ) {
      if (
        (scheme_issued_start_year % 4 == 0 &&
          scheme_issued_start_year % 100 != 0) ||
        scheme_issued_start_year % 400 == 0
      ) {
      } else {
        scheme_issued_start_day_Error = true;
        SubsidyErrors.push("     Enter the valid day");
        SubsidyFocus.push("#scheme_issued_start_day");
        Additem = Additem + 1;
      }
    }

    if (
      scheme_issued_start_day == 30 &&
      scheme_issued_start_month == parseInt("02", 8)
    ) {
      scheme_issued_start_day_Error = true;
      SubsidyErrors.push("Enter the valid day");
      SubsidyFocus.push("#scheme_issued_start_day");
      Additem = Additem + 1;
    }

    // day velidation ends here

    if (!scheme_issued_start_month) {
      scheme_issued_start_month_Error = true;
      SubsidyErrors.push("     Enter the legal granting month of the date");
      SubsidyFocus.push("#scheme_issued_start_month");
      Additem = Additem + 1;
    }

    if (scheme_issued_start_month > 12 || scheme_issued_start_month == 0) {
      scheme_issued_start_month_Error = true;
      SubsidyErrors.push("     Enter the legal granting month from 1 to 12");
      SubsidyFocus.push("#scheme_issued_start_month");
      Additem = Additem + 1;
    }

    if (!scheme_issued_start_year) {
      scheme_issued_start_year_Error = true;
      SubsidyErrors.push("     Enter the legal granting year of the date");
      SubsidyFocus.push("#scheme_issued_start_year");
      Additem = Additem + 1;
    }

    var SubsidyArraySize = SubsidyErrors.length;

    if (
      Subsidy_Measure_Title_Error ||
      Subsidy_Adhoc_Error ||
      Granting_Authority_Name_Error ||
      scheme_issued_start_day_Error ||
      scheme_issued_start_month_Error ||
      scheme_issued_start_year_Error ||
      Legal_Basis_Error ||
      Granting_Authority_URL_Error ||
      Granting_Authority_Policy_Error ||
      Budget_Error ||
      scheme_issued_end_day_Error ||
      scheme_issued_end_month_Error ||
      scheme_issued_end_year_Error
    ) {
      res.render("bulkupload/subsidymeasures-add", {
        Subsidy_Measure_Title_Global,
        Subsidy_Adhoc_Global,

        Granting_Authority_Name_Global,
        Scheme_Start_Day_Global,
        Scheme_Start_Month_Global,
        Scheme_Start_Year_Global,
        Scheme_End_Day_Global,
        Scheme_End_Month_Global,
        Scheme_End_Year_Global,
        Legal_Basis_Global,
        Granting_Authority_URL_Global,
        Granting_Authority_Policy_Global,
        Budget_Global,

        Subsidy_Measure_Title_Error,
        Subsidy_Adhoc_Error,
        Legal_Basis_Error,
        Granting_Authority_URL_Error,
        Granting_Authority_Policy_Error,
        Budget_Error,
        Granting_Authority_Name_Error,
        scheme_issued_start_day_Error,
        scheme_issued_start_month_Error,
        scheme_issued_start_year_Error,
        scheme_issued_end_day_Error,
        scheme_issued_end_month_Error,
        scheme_issued_end_year_Error,
        SubsidyErrors,
        SubsidyArraySize,
        SubsidyFocus,

        isAddSubsidyPrimarycall,
      });
    } else {
      res.render("bulkupload/subsidymeasure-reviewdetails", {
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
        GetMonthName,
      });
    }
  } else {
    res.render("bulkupload/subsidyaward-cancel");
  }
});

router.get("/", (req, res) => {
  res.render("bulkupload/subsidymeasure-reviewdetails");
});

module.exports = router;
