// ********************************************************************
// Gov.UK transparency subsidy scheme review details module
// ********************************************************************

const express = require("express");
var session = require("express-session");
const router = express.Router();

router.post("/", (req, res) => {
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
    res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    isAddSubsidyPrimarycall = false;
    ssn.GetMonthName = "";
    ssn.GetEndMonthName = "";
    ssn.SubsidyErrors = [];
    ssn.SubsidyFocus = [];
    ssn.Additem = 0;
    ssn.SubsidyArraySize = 0;
    ssn.Subsidy_Measure_Title_Error = false;
    ssn.Subsidy_Adhoc_Error = false;
    ssn.Legal_Basis_Error = false;
    ssn.Granting_Authority_Name_Error = false;
    ssn.Granting_Authority_URL_Error = false;
    ssn.Granting_Authority_Policy_Error = false;
    ssn.Budget_Error = false;
    ssn.Granting_Authority_Name_Inactive_Error = false;
    ssn.Subsidy_Measure_Title_255_Error = false;
    ssn.Granting_Authority_URL_255_Error = false;
    ssn.Granting_Authority_Policy_255_Error = false;
    ssn.scheme_issued_start_year_Error = false;
    ssn.scheme_issued_start_month_Error = false;
    ssn.scheme_issued_start_day_Error = false;
    ssn.scheme_issued_end_year_Error = false;
    ssn.scheme_issued_end_month_Error = false;
    ssn.scheme_issued_end_day_Error = false;
    ssn.scheme_issued_end_day_lesser_Error = false;

    var {
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
    console.log(
      "Granting_Authority_Name from schem: " + Granting_Authority_Name
    );

    ssn.Subsidy_Adhoc_Global = Subsidy_Adhoc;

    if (ssn.dashboard_roles == "BEIS Administrator") {
      ssn.Granting_Authority_Name_Measure_Global = Granting_Authority_Name;
    } else {
      ssn.Granting_Authority_Name_Measure_Global = ssn.dashboard_ga_name;
      Granting_Authority_Name = ssn.dashboard_ga_name;
    }

    ssn.Subsidy_Measure_Title_Global = Subsidy_Measure_Title;
    ssn.Legal_Basis_Global = Legal_Basis;
    ssn.Granting_Authority_URL_Global = Granting_Authority_URL;
    ssn.Granting_Authority_Policy_Global = Granting_Authority_Policy;
    const formatter = new Intl.NumberFormat("en-GB");

    if (Budget.includes(",")) Budget = Budget.split(",").join("");
    formatedCurrency = formatter.format(Budget);

    ssn.Budget_Global = Budget;

    ssn.Scheme_Start_Day_Global = scheme_issued_start_day;
    ssn.Scheme_Start_Month_Global = scheme_issued_start_month;
    ssn.Scheme_Start_Year_Global = scheme_issued_start_year;

    if (ssn.Subsidy_Adhoc_Global == "Yes") {
      ssn.Scheme_End_Day_Global = scheme_issued_start_day;
      ssn.Scheme_End_Month_Global = scheme_issued_start_month;
      ssn.Scheme_End_Year_Global = scheme_issued_start_year;
      scheme_issued_end_day = scheme_issued_start_day;
      scheme_issued_end_month = scheme_issued_start_month;
      scheme_issued_end_year = scheme_issued_start_year;
    } else {
      ssn.Scheme_End_Day_Global = scheme_issued_end_day;
      ssn.Scheme_End_Month_Global = scheme_issued_end_month;
      ssn.Scheme_End_Year_Global = scheme_issued_end_year;
    }

    console.log("ssn.Subsidy_Adhoc_Global :" + ssn.Subsidy_Adhoc_Global);
    console.log(
      "ssn.Granting_Authority_Name_Measure_Global :" +
        ssn.Granting_Authority_Name_Measure_Global
    );
    console.log(
      "ssn.Subsidy_Measure_Title_Global :" + ssn.Subsidy_Measure_Title_Global
    );
    console.log("ssn.Legal_Basis_Global  :" + ssn.Legal_Basis_Global);
    console.log(
      "ssn.Granting_Authority_URL_Global :" + ssn.Granting_Authority_URL_Global
    );
    console.log(
      "ssn.Granting_Authority_Policy_Global :" +
        ssn.Granting_Authority_Policy_Global
    );
    console.log("ssn.Budget_Global :" + ssn.Budget_Global);

    console.log("ssn.Scheme_Start_Day_Global :" + ssn.Scheme_Start_Day_Global);
    console.log(
      "ssn.Scheme_Start_Month_Global :" + ssn.Scheme_Start_Month_Global
    );
    console.log(
      "ssn.Scheme_Start_Year_Global  :" + ssn.Scheme_Start_Year_Global
    );
    console.log("ssn.Scheme_End_Day_Global :" + ssn.Scheme_End_Day_Global);
    console.log("ssn.Scheme_End_Month_Global :" + ssn.Scheme_End_Month_Global);
    console.log("ssn.Scheme_End_Year_Global  :" + ssn.Scheme_End_Year_Global);

    if (scheme_issued_start_month == 1) {
      ssn.GetMonthName = "January";
    }
    if (scheme_issued_start_month == 2) {
      ssn.GetMonthName = "February";
    }
    if (scheme_issued_start_month == 3) {
      ssn.GetMonthName = "March";
    }
    if (scheme_issued_start_month == 4) {
      ssn.GetMonthName = "April";
    }
    if (scheme_issued_start_month == 5) {
      ssn.GetMonthName = "May";
    }
    if (scheme_issued_start_month == 6) {
      ssn.GetMonthName = "June";
    }
    if (scheme_issued_start_month == 7) {
      ssn.GetMonthName = "July";
    }
    if (scheme_issued_start_month == 8) {
      ssn.GetMonthName = "August";
    }
    if (scheme_issued_start_month == 9) {
      ssn.GetMonthName = "September";
    }
    if (scheme_issued_start_month == 10) {
      ssn.GetMonthName = "October";
    }
    if (scheme_issued_start_month == 11) {
      ssn.GetMonthName = "November";
    }
    if (scheme_issued_start_month == 12) {
      ssn.GetMonthName = "December";
    }

    if (scheme_issued_end_month == 1) {
      GetEndMonthName = "January";
    }
    if (scheme_issued_end_month == 2) {
      GetEndMonthName = "February";
    }
    if (scheme_issued_end_month == 3) {
      GetEndMonthName = "March";
    }
    if (scheme_issued_end_month == 4) {
      GetEndMonthName = "April";
    }
    if (scheme_issued_end_month == 5) {
      GetEndMonthName = "May";
    }
    if (scheme_issued_end_month == 6) {
      GetEndMonthName = "June";
    }
    if (scheme_issued_end_month == 7) {
      GetEndMonthName = "July";
    }
    if (scheme_issued_end_month == 8) {
      GetEndMonthName = "August";
    }
    if (scheme_issued_end_month == 9) {
      GetEndMonthName = "September";
    }
    if (scheme_issued_end_month == 10) {
      GetEndMonthName = "October";
    }
    if (scheme_issued_end_month == 11) {
      GetEndMonthName = "November";
    }
    if (scheme_issued_end_month == 12) {
      GetEndMonthName = "December";
    }

    console.log("scheme_issued_start_month" + ssn.GetMonthName);

    if (buttonvalue == "Continue") {
      //Empty field validations
      if (!Subsidy_Adhoc) {
        ssn.Subsidy_Adhoc_Error = true;
        ssn.SubsidyErrors.push(" Select the adhoc subsidy scheme");
        ssn.SubsidyFocus.push("#Subsidy_Adhoc");
        // Additem = Additem + 1;
      }
      if (!Subsidy_Measure_Title) {
        ssn.Subsidy_Measure_Title_Error = true;
        ssn.SubsidyErrors.push("Enter the subsidy scheme name");
        ssn.SubsidyFocus.push("#Subsidy_Measure_Title");
        // Additem = Additem + 1;
      }

      if (Subsidy_Measure_Title != "" && Subsidy_Measure_Title > 255) {
        ssn.Subsidy_Measure_Title_Error = false;
        ssn.Subsidy_Measure_Title_255_Error = true;
        ssn.SubsidyErrors.push(
          "Subsidy scheme name cannot be greater than 255 characters"
        );
        ssn.SubsidyFocus.push("#Subsidy_Measure_Title");
        // Additem = Additem + 1;
      }

      // if (!Subsidy_Measure_Title) {

      // }

      if (!Granting_Authority_Name) {
        ssn.Granting_Authority_Name_Error = true;
        ssn.SubsidyErrors.push(" Enter the granting authority name");
        ssn.SubsidyFocus.push("#Granting_Authority_Name");
        // Additem = Additem + 1;
      }

      if (!Legal_Basis) {
        ssn.Legal_Basis_Error = true;
        ssn.SubsidyErrors.push("Enter a valid legal basis");
        ssn.SubsidyFocus.push("#Legal_Basis");
        // Additem = Additem + 1;
      }

      if (!Granting_Authority_URL) {
        ssn.Granting_Authority_URL_Error = true;
        ssn.SubsidyErrors.push("Enter the granting authority policy url");
        ssn.SubsidyFocus.push("#Granting_Authority_URL");
        // Additem = Additem + 1;
      }

      if (Granting_Authority_URL != "" && Granting_Authority_URL.length > 255) {
        ssn.Granting_Authority_URL_Error = false;
        ssn.Granting_Authority_URL_255_Error = true;
        ssn.SubsidyErrors.push(
          "Granting authority policy url cannot be greater than 255 characters"
        );
        ssn.SubsidyFocus.push("#Granting_Authority_URL");
        // Additem = Additem + 1;
      }

      if (!Granting_Authority_Policy) {
        ssn.Granting_Authority_Policy_Error = true;
        ssn.SubsidyErrors.push(
          "Enter the granting authority policy description"
        );
        ssn.SubsidyFocus.push("#Granting_Authority_Policy");
        // Additem = Additem + 1;
      }

      if (
        Granting_Authority_Policy != "" &&
        Granting_Authority_Policy.length > 255
      ) {
        ssn.Granting_Authority_Policy_Error = false;
        ssn.Granting_Authority_Policy_255_Error = true;
        ssn.SubsidyErrors.push(
          "Granting authority policy description cannot be greater than 255 characters"
        );
        ssn.SubsidyFocus.push("#Granting_Authority_Policy");
        // Additem = Additem + 1;
      }
      if (!Budget) {
        ssn.Budget_Error = true;
        ssn.SubsidyErrors.push("Enter the valid budget");
        ssn.SubsidyFocus.push("#Granting_Authority_Policy");
        // Additem = Additem + 1;
      }

      if (!scheme_issued_start_day) {
        ssn.scheme_issued_start_day_Error = true;
        ssn.SubsidyErrors.push("Enter the legal granting day of the date");
        ssn.SubsidyFocus.push("#scheme_issued_start_day");
        // Additem = Additem + 1;
      }

      // day validation starts here
      if (scheme_issued_start_day != "") {
        if (scheme_issued_start_day > 31 || scheme_issued_start_day < 1) {
          ssn.scheme_issued_end_day_Error = true;

          ssn.SubsidyErrors.push(
            "Enter the valid legal granting day of the date"
          );
          ssn.SubsidyFocus.push("#scheme_issued_start_day");
          // Additem = Additem + 1;
        }

        if (
          scheme_issued_start_day == 31 &&
          (scheme_issued_start_month == parseInt("02", 8) ||
            scheme_issued_start_month == parseInt("04", 8) ||
            scheme_issued_start_month == parseInt("06", 8) ||
            scheme_issued_start_month == parseInt("09", 8) ||
            scheme_issued_start_month == 11)
        ) {
          ssn.scheme_issued_start_day_Error = true;
          ssn.SubsidyErrors.push(
            "Enter the valid legal granting day of the date"
          );
          ssn.SubsidyFocus.push("#scheme_issued_start_day");
          // Additem = Additem + 1;
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
            ssn.scheme_issued_start_day_Error = true;
            ssn.SubsidyErrors.push(
              "Enter the valid legal granting day of the date"
            );
            ssn.SubsidyFocus.push("#scheme_issued_start_day");
            // Additem = Additem + 1;
          }
        }

        if (
          scheme_issued_start_day == 30 &&
          scheme_issued_start_month == parseInt("02", 8)
        ) {
          ssn.scheme_issued_start_day_Error = true;
          ssn.SubsidyErrors.push(
            "Enter the valid legal granting day of the date"
          );
          ssn.SubsidyFocus.push("#scheme_issued_start_day");
          // Additem = Additem + 1;
        }
      }
      // day velidation ends here

      if (!scheme_issued_start_month) {
        ssn.scheme_issued_start_month_Error = true;
        ssn.SubsidyErrors.push("Enter the legal granting month of the date");
        ssn.SubsidyFocus.push("#scheme_issued_start_month");
        // Additem = Additem + 1;
      }
      if (scheme_issued_start_month != "") {
        if (scheme_issued_start_month > 12 || scheme_issued_start_month == 0) {
          ssn.scheme_issued_start_month_Error = true;
          ssn.SubsidyErrors.push("Enter the legal granting month from 1 to 12");
          ssn.SubsidyFocus.push("#scheme_issued_start_month");
          // Additem = Additem + 1;
        }
      }

      if (!scheme_issued_start_year) {
        ssn.scheme_issued_start_year_Error = true;
        ssn.SubsidyErrors.push("Enter the legal granting year of the date");
        ssn.SubsidyFocus.push("#scheme_issued_start_year");
        // Additem = Additem + 1;
      }
      if (ssn.Subsidy_Adhoc_Global != "Yes") {
        if (!scheme_issued_end_day) {
          ssn.scheme_issued_end_day_Error = true;
          ssn.SubsidyErrors.push(
            "Enter the legal granting end day of the date"
          );
          ssn.SubsidyFocus.push("#scheme_issued_end_day");
          // Additem = Additem + 1;
        }

        // day validation starts here
        if (scheme_issued_end_day != "") {
          var sdate = new Date(
            scheme_issued_start_year +
              "-" +
              scheme_issued_start_month +
              "-" +
              scheme_issued_start_day
          );
          var edate = new Date(
            scheme_issued_end_year +
              "-" +
              scheme_issued_end_month +
              "-" +
              scheme_issued_end_day
          );
          // var truedate = sdate > edate;
          if (sdate > edate) {
            ssn.scheme_issued_end_day_Error = false;
            ssn.scheme_issued_end_day_lesser_Error = true;
            ssn.SubsidyErrors.push("End date should be later than start date");
            ssn.SubsidyFocus.push("#scheme_issued_end_day");
          }
          if (scheme_issued_end_day > 31 || scheme_issued_end_day < 1) {
            ssn.scheme_issued_end_day_Error = true;
            ssn.SubsidyErrors.push("Enter the valid end date");
            ssn.SubsidyFocus.push("#scheme_issued_end_day");
            // Additem = Additem + 1;
          }

          if (
            scheme_issued_end_day == 31 &&
            (scheme_issued_end_month == parseInt("02", 8) ||
              scheme_issued_end_month == parseInt("04", 8) ||
              scheme_issued_end_month == parseInt("06", 8) ||
              scheme_issued_end_month == parseInt("09", 8) ||
              scheme_issued_end_month == 11)
          ) {
            ssn.scheme_issued_end_day_Error = true;
            ssn.SubsidyErrors.push("Enter the valid end date");
            ssn.SubsidyFocus.push("#scheme_issued_end_day");
            // Additem = Additem + 1;
          }

          if (
            scheme_issued_end_day == 29 &&
            scheme_issued_end_month == parseInt("02", 8)
          ) {
            if (
              (scheme_issued_end_year % 4 == 0 &&
                scheme_issued_end_year % 100 != 0) ||
              scheme_issued_end_year % 400 == 0
            ) {
            } else {
              ssn.scheme_issued_end_day_Error = true;
              ssn.SubsidyErrors.push("Enter the valid end date");
              ssn.SubsidyFocus.push("#scheme_issued_end_day");
              // Additem = Additem + 1;
            }
          }

          if (
            scheme_issued_end_day == 30 &&
            scheme_issued_end_month == parseInt("02", 8)
          ) {
            ssn.scheme_issued_end_day_Error = true;
            ssn.SubsidyErrors.push("Enter the valid end date");
            ssn.SubsidyFocus.push("#scheme_issued_end_day");
            // Additem = Additem + 1;
          }
        }
        // day velidation ends here

        if (!scheme_issued_end_month) {
          ssn.scheme_issued_end_month_Error = true;
          ssn.SubsidyErrors.push(
            "Enter the legal granting end month of the date"
          );
          ssn.SubsidyFocus.push("#scheme_issued_end_month");
          // Additem = Additem + 1;
        }
        if (scheme_issued_end_month != "") {
          if (scheme_issued_end_month > 12 || scheme_issued_end_month == 0) {
            ssn.scheme_issued_end_month_Error = true;
            ssn.SubsidyErrors.push(
              "Enter the legal granting end month from 1 to 12"
            );
            ssn.SubsidyFocus.push("#scheme_issued_end_month");
            // Additem = Additem + 1;
          }
        }
        if (!scheme_issued_end_year) {
          ssn.scheme_issued_end_year_Error = true;
          ssn.SubsidyErrors.push(
            "Enter the legal granting end year of the date"
          );
          ssn.SubsidyFocus.push("#scheme_issued_end_year");
          // Additem = Additem + 1;
        }
      }

      ssn.SubsidyArraySize = ssn.SubsidyErrors.length;
      if (
        ssn.Subsidy_Measure_Title_Error ||
        ssn.Subsidy_Adhoc_Error ||
        ssn.Granting_Authority_Name_Error ||
        ssn.scheme_issued_start_day_Error ||
        ssn.scheme_issued_start_month_Error ||
        ssn.scheme_issued_start_year_Error ||
        ssn.Legal_Basis_Error ||
        ssn.Granting_Authority_URL_Error ||
        ssn.Granting_Authority_Policy_Error ||
        ssn.Budget_Error ||
        ssn.scheme_issued_end_day_Error ||
        ssn.scheme_issued_end_month_Error ||
        ssn.scheme_issued_end_day_lesser_Error ||
        ssn.scheme_issued_end_year_Error ||
        ssn.Subsidy_Measure_Title_255_Error ||
        ssn.Granting_Authority_URL_255_Error ||
        ssn.Granting_Authority_Policy_255_Error
      ) {
        res.render("bulkupload/subsidymeasures-add", {
          // ssn.Subsidy_Measure_Title_Global,
          // ssn.Subsidy_Adhoc_Global,

          // ssn.Granting_Authority_Name_Measure_Global,
          // ssn.Scheme_Start_Day_Global,
          // ssn.Scheme_Start_Month_Global,
          // ssn.Scheme_Start_Year_Global,
          // ssn.Scheme_End_Day_Global,
          // ssn.Scheme_End_Month_Global,
          // ssn.Scheme_End_Year_Global,
          // ssn.Legal_Basis_Global,
          // ssn.Granting_Authority_URL_Global,
          // ssn.Granting_Authority_Policy_Global,
          // ssn.Budget_Global,

          // ssn.Subsidy_Measure_Title_Error,
          // ssn.Subsidy_Adhoc_Error,
          // ssn.Legal_Basis_Error,
          // ssn.Granting_Authority_URL_Error,
          // ssn.Granting_Authority_Policy_Error,
          // ssn.Budget_Error,
          formatedCurrency,
          // ssn.Granting_Authority_Name_Error,
          // ssn.scheme_issued_start_day_Error,
          // ssn.scheme_issued_start_month_Error,
          // ssn.scheme_issued_start_year_Error,
          // scheme_issued_end_day_Error,
          // scheme_issued_end_month_Error,
          // scheme_issued_end_year_Error,
          // ssn.SubsidyErrors,
          // SubsidyArraySize,
          // ssn.SubsidyFocus,
          ssn,
          isAddSubsidyPrimarycall,
        });
      } else {
        res.render("bulkupload/subsidymeasure-reviewdetails", {
          // ssn.Subsidy_Measure_Title_Global,
          // ssn.Subsidy_Adhoc_Global,
          // ssn.Legal_Basis_Global,
          // ssn.Granting_Authority_URL_Global,
          // ssn.Granting_Authority_Policy_Global,
          // ssn.Budget_Global,
          // ssn.Granting_Authority_Name_Measure_Global,
          // ssn.Scheme_Start_Day_Global,
          // ssn.Scheme_Start_Month_Global,
          // ssn.Scheme_Start_Year_Global,
          // ssn.Scheme_End_Day_Global,
          // ssn.Scheme_End_Month_Global,
          // ssn.Scheme_End_Year_Global,
          ssn,
          // ssn.GetMonthName,
          GetEndMonthName,
          formatedCurrency,
        });
      }
    } else {
      ssn.Subsidy_Adhoc_Global = Subsidy_Adhoc;
      ssn.Granting_Authority_Name_Measure_Global = Granting_Authority_Name;
      ssn.Subsidy_Measure_Title_Global = Subsidy_Measure_Title;
      ssn.Legal_Basis_Global = Legal_Basis;
      ssn.Granting_Authority_URL_Global = Granting_Authority_URL;
      ssn.Granting_Authority_Policy_Global = Granting_Authority_Policy;
      const formatter = new Intl.NumberFormat("en-GB");

      if (Budget.includes(",")) Budget = Budget.split(",").join("");
      formatedCurrency = formatter.format(Budget);

      ssn.Budget_Global = Budget;

      ssn.Scheme_Start_Day_Global = scheme_issued_start_day;
      ssn.Scheme_Start_Month_Global = scheme_issued_start_month;
      ssn.Scheme_Start_Year_Global = scheme_issued_start_year;
      res.render("bulkupload/subsidymeasure-cancel");
    }
  }
});

router.get("/", (req, res) => {
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
    res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    res.render("bulkupload/subsidymeasure-reviewdetails");
  }
});

module.exports = router;
