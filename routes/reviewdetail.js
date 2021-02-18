const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  isAddSubsidyPrimarycall = false;
  GetMonthName = "";
  SubsidyErrors = [];
  SubsidyFocus = [];
  Additem = 0;
  SubsidyArraySize = 0;
  Subsidy_Control_Number_Error = false;
  Subsidy_Measure_Title_Error = false;
  // Subsidy_Adhoc_Error = false;
  Subsidy_Objective_Error = false;
  Subsidy_Objective_Other_Error = false;
  Subsidy_Instrument_Error = false;
  Subsidy_Instrument_Other_Error = false;
  Subsidy_Element_Full_Amount_Error = false;
  Subsidy_Full_Amount_Range_Error = false;
  National_ID_Type_Error = false;
  National_ID_Number_Error = false;
  Beneficiary_Name_Error = false;
  Size_of_the_Organisation_Error = false;
  Granting_Authority_Name_Error = false;
  Legal_Granting_Date_Day_Error = false;
  Legal_Granting_Date_Month_Error = false;
  Legal_Granting_Date_Year_Error = false;
  Goods_or_Services_Error = false;
  Spending_Region_Error = false;
  Spending_Sector_Error = false;

  const {
    Subsidy_Control_Number,
    Subsidy_Measure_Title,
    // Subsidy_Adhoc,
    Subsidy_Objective,
    Subsidy_Objective_Other,
    Subsidy_Instrument,
    Subsidy_Instrument_Other,
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
    buttonvalue,
    mylink,
  } = req.body;

  console.log("isAddSubsidyPrimarycall: " + isAddSubsidyPrimarycall);
  console.log("Subsidy_Instrument :" + Subsidy_Instrument);
  console.log("buttonvalue:" + buttonvalue);
  console.log("mylink:" + mylink);
  // console.log("  Subsidy_Adhoc :" + Subsidy_Adhoc);

  Subsidy_Control_Number_Global = Subsidy_Control_Number;
  Subsidy_Measure_Title_Global = Subsidy_Measure_Title;
  // Subsidy_Adhoc_Global = Subsidy_Adhoc;
  Subsidy_Objective_Global = Subsidy_Objective;
  Subsidy_Objective_Other_Global = Subsidy_Objective_Other;
  Subsidy_Instrument_Global = Subsidy_Instrument;
  Subsidy_Instrument_Other_Global = Subsidy_Instrument_Other;

  if (
    Subsidy_Instrument_Global !==
    "Tax measures (tax credit, or tax/duty exemption)"
  ) {
    Subsidy_Element_Full_Amount_Global = Subsidy_Element_Full_Amount;
  } else {
    Subsidy_Element_Full_Amount_Global = "NA";
  }

  if (
    Subsidy_Instrument_Global ==
    "Tax measures (tax credit, or tax/duty exemption)"
  ) {
    Subsidy_Full_Amount_Range_Global = Subsidy_Full_Amount_Range;
  } else {
    Subsidy_Full_Amount_Range_Global = "NA";
  }

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

  Subsidy_Control_Number_Global_Substring = Subsidy_Control_Number_Global.substring(
    2,
    10
  );

  if (Legal_Granting_Date_Month_Global == 1) {
    GetMonthName = "January";
  }
  if (Legal_Granting_Date_Month_Global == 2) {
    GetMonthName = "February";
  }
  if (Legal_Granting_Date_Month_Global == 3) {
    GetMonthName = "March";
  }
  if (Legal_Granting_Date_Month_Global == 4) {
    GetMonthName = "April";
  }
  if (Legal_Granting_Date_Month_Global == 5) {
    GetMonthName = "May";
  }
  if (Legal_Granting_Date_Month_Global == 6) {
    GetMonthName = "June";
  }
  if (Legal_Granting_Date_Month_Global == 7) {
    GetMonthName = "July";
  }
  if (Legal_Granting_Date_Month_Global == 8) {
    GetMonthName = "August";
  }
  if (Legal_Granting_Date_Month_Global == 9) {
    GetMonthName = "September";
  }
  if (Legal_Granting_Date_Month_Global == 10) {
    GetMonthName = "October";
  }
  if (Legal_Granting_Date_Month_Global == 11) {
    GetMonthName = "November";
  }
  if (Legal_Granting_Date_Month_Global == 12) {
    GetMonthName = "December";
  }

  console.log("Legal_Granting_Date_Month_Global" + GetMonthName);

  if (buttonvalue == "continue") {
    //Empty field validations

    if (!Subsidy_Control_Number && !Subsidy_Measure_Title) {
      Subsidy_Control_Number_Error = true;
      SubsidyErrors[Additem] =
        "     Enter the either subsidy control number (Or)";
      SubsidyFocus[Additem] = "#Subsidy_Control_Number";
      Additem = Additem + 1;
      Subsidy_Measure_Title_Error = true;
      SubsidyErrors[Additem] = "     Enter the subsidy sheme name";
      SubsidyFocus[Additem] = "#Subsidy_Measure_Title";
      Additem = Additem + 1;
    }

    // if (!Subsidy_Measure_Title) {

    // }
    // if (!Subsidy_Adhoc) {
    //   Subsidy_Adhoc_Error = true;
    //   SubsidyErrors[Additem] = "     Select the adhoc subsidy scheme";
    //   SubsidyFocus[Additem] = "#Subsidy_Adhoc";
    //   Additem = Additem + 1;
    // }

    if (Subsidy_Objective == "Empty") {
      Subsidy_Objective_Error = true;
      SubsidyErrors[Additem] = "     Select the subsidy purpose";
      SubsidyFocus[Additem] = "#Subsidy_Objective";
      Additem = Additem + 1;
    }

    if (Subsidy_Objective == "Other" && Subsidy_Objective_Other == "") {
      Subsidy_Objective_Other_Error = true;
      SubsidyErrors[Additem] =
        "     Enter the subsidy purpose for other category";
      SubsidyFocus[Additem] = "#Subsidy_Objective_Other";
      Additem = Additem + 1;
    }

    if (Subsidy_Instrument == "") {
      Subsidy_Instrument_Error = true;
      SubsidyErrors[Additem] = "     Select the subsidy type";
      SubsidyFocus[Additem] = "#Subsidy_Instrument";
      Additem = Additem + 1;
    }

    if (Subsidy_Instrument == "Other" && Subsidy_Instrument_Other == "") {
      Subsidy_Instrument_Other_Error = true;
      SubsidyErrors[Additem] = "     Enter the subsidy type for other category";
      SubsidyFocus[Additem] = "#Subsidy_Instrument_Other";
      Additem = Additem + 1;
    }

    console.log("subsidy element full amot : " + Subsidy_Element_Full_Amount);
    console.log("Subsidy_Full_Amount_Range : " + Subsidy_Full_Amount_Range);
    if (
      !Subsidy_Element_Full_Amount &&
      Subsidy_Instrument != "Tax measures (tax credit, or tax/duty exemption)"
    ) {
      Subsidy_Element_Full_Amount_Error = true;
      SubsidyErrors[Additem] = "     Enter the subsidy element full amount";
      SubsidyFocus[Additem] = "#Subsidy_Element_Full_Amount";
      Additem = Additem + 1;
    } else if (
      !Subsidy_Full_Amount_Range &&
      Subsidy_Instrument == "Tax measures"
    ) {
      Subsidy_Full_Amount_Range_Error = true;
      SubsidyErrors[Additem] = "     Enter the subsidy full amount range";
      SubsidyFocus[Additem] = "#Subsidy_Full_Amount_Range";
      Additem = Additem + 1;
    }

    if (!National_ID_Type) {
      National_ID_Type_Error = true;
      SubsidyErrors[Additem] = "     Choose the national id type";
      SubsidyFocus[Additem] = "#National_ID_Type";
      Additem = Additem + 1;
    }

    if (!National_ID_Number) {
      National_ID_Number_Error = true;
      SubsidyErrors[Additem] = "     Enter the national id number";
      SubsidyFocus[Additem] = "#National_ID_Number";
      Additem = Additem + 1;
    }

    if (!Beneficiary_Name) {
      Beneficiary_Name_Error = true;
      SubsidyErrors[Additem] = "     Enter the beneficiary name";
      SubsidyFocus[Additem] = "#Beneficiary_Name";
      Additem = Additem + 1;
    }

    if (!Size_of_the_Organisation) {
      Size_of_the_Organisation_Error = true;
      SubsidyErrors[Additem] = "     Choose the size of the organisation";
      SubsidyFocus[Additem] = "#Size_of_the_Organisation";
      Additem = Additem + 1;
    }

    if (!Granting_Authority_Name) {
      Granting_Authority_Name_Error = true;
      SubsidyErrors[Additem] = "     Enter the granting authority name";
      SubsidyFocus[Additem] = "#Granting_Authority_Name";
      Additem = Additem + 1;
    }

    if (!Legal_Granting_Date_Day) {
      Legal_Granting_Date_Day_Error = true;
      SubsidyErrors[Additem] = "     Enter the legal granting day of the date";
      SubsidyFocus[Additem] = "#Legal_Granting_Date_Day";
      Additem = Additem + 1;
    }

    // day validation starts here

    if (Legal_Granting_Date_Day > 31 || Legal_Granting_Date_Day < 1) {
      Legal_Granting_Date_Day_Error = true;
      SubsidyErrors[Additem] =
        "     Enter the valid legal granting day of the date";
      SubsidyFocus[Additem] = "#Legal_Granting_Date_Day";
      Additem = Additem + 1;
    }

    if (
      Legal_Granting_Date_Day == 31 &&
      (Legal_Granting_Date_Month == parseInt("02", 8) ||
        Legal_Granting_Date_Month == parseInt("04", 8) ||
        Legal_Granting_Date_Month == parseInt("06", 8) ||
        Legal_Granting_Date_Month == parseInt("09", 8) ||
        Legal_Granting_Date_Month == 11)
    ) {
      Legal_Granting_Date_Day_Error = true;
      SubsidyErrors[Additem] = "     Enter the valid day";
      SubsidyFocus[Additem] = "#Legal_Granting_Date_Day";
      Additem = Additem + 1;
    }

    if (
      Legal_Granting_Date_Day == 29 &&
      Legal_Granting_Date_Month == parseInt("02", 8)
    ) {
      if (
        (Legal_Granting_Date_Year % 4 == 0 &&
          Legal_Granting_Date_Year % 100 != 0) ||
        Legal_Granting_Date_Year % 400 == 0
      ) {
      } else {
        Legal_Granting_Date_Day_Error = true;
        SubsidyErrors[Additem] = "     Enter the valid day";
        SubsidyFocus[Additem] = "#Legal_Granting_Date_Day";
        Additem = Additem + 1;
      }
    }

    if (
      Legal_Granting_Date_Day == 30 &&
      Legal_Granting_Date_Month == parseInt("02", 8)
    ) {
      Legal_Granting_Date_Day_Error = true;
      SubsidyErrors[Additem] = "     Enter the valid day";
      SubsidyFocus[Additem] = "#Legal_Granting_Date_Day";
      Additem = Additem + 1;
    }

    // day velidation ends here

    if (!Legal_Granting_Date_Month) {
      Legal_Granting_Date_Month_Error = true;
      SubsidyErrors[Additem] =
        "     Enter the legal granting month of the date";
      SubsidyFocus[Additem] = "#Legal_Granting_Date_Month";
      Additem = Additem + 1;
    }

    if (Legal_Granting_Date_Month > 12 || Legal_Granting_Date_Month == 0) {
      Legal_Granting_Date_Month_Error = true;
      SubsidyErrors[Additem] =
        "     Enter the legal granting month from 1 to 12";
      SubsidyFocus[Additem] = "#Legal_Granting_Date_Month";
      Additem = Additem + 1;
    }

    if (!Legal_Granting_Date_Year) {
      Legal_Granting_Date_Year_Error = true;
      SubsidyErrors[Additem] = "     Enter the legal granting year of the date";
      SubsidyFocus[Additem] = "#Legal_Granting_Date_Year";
      Additem = Additem + 1;
    }

    if (!Goods_or_Services) {
      Goods_or_Services_Error = true;
      SubsidyErrors[Additem] = "     Choose the Goods or Services";
      SubsidyFocus[Additem] = "#Goods_or_Services";
      Additem = Additem + 1;
    }

    if (Spending_Region == "Empty") {
      Spending_Region_Error = true;
      SubsidyErrors[Additem] = "     Select the spending region";
      SubsidyFocus[Additem] = "#Spending_Region";
    }

    if (Spending_Sector == "Empty") {
      Spending_Sector_Error = true;
      SubsidyErrors[Additem] = "     Select the spending sector";
      SubsidyFocus[Additem] = "#Spending_Sector";
    }

    var SubsidyArraySize = SubsidyErrors.length;

    if (
      Subsidy_Control_Number_Error ||
      Subsidy_Measure_Title_Error ||
      // Subsidy_Adhoc_Error ||
      Subsidy_Objective_Error ||
      Subsidy_Objective_Other_Error ||
      Subsidy_Instrument_Error ||
      Subsidy_Instrument_Other_Error ||
      Subsidy_Element_Full_Amount_Error ||
      Subsidy_Full_Amount_Range_Error ||
      National_ID_Type_Error ||
      National_ID_Number_Error ||
      Beneficiary_Name_Error ||
      Size_of_the_Organisation_Error ||
      Granting_Authority_Name_Error ||
      Legal_Granting_Date_Day_Error ||
      Legal_Granting_Date_Month_Error ||
      Legal_Granting_Date_Year_Error ||
      Goods_or_Services_Error ||
      Spending_Region_Error ||
      Spending_Sector_Error
    ) {
      res.render("bulkupload/addsubsidyaward", {
        Subsidy_Control_Number_Global,
        Subsidy_Measure_Title_Global,
        // Subsidy_Adhoc_Global,
        Subsidy_Objective_Global,
        Subsidy_Objective_Other_Global,
        Subsidy_Instrument_Global,
        Subsidy_Instrument_Other_Global,
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

        Subsidy_Control_Number_Error,
        Subsidy_Measure_Title_Error,
        // Subsidy_Adhoc_Error,
        Subsidy_Objective_Error,
        Subsidy_Objective_Other_Error,
        Subsidy_Instrument_Error,
        Subsidy_Instrument_Other_Error,
        Subsidy_Element_Full_Amount_Error,
        Subsidy_Full_Amount_Range_Error,
        National_ID_Type_Error,
        National_ID_Number_Error,
        Beneficiary_Name_Error,
        Size_of_the_Organisation_Error,
        Granting_Authority_Name_Error,
        Legal_Granting_Date_Day_Error,
        Legal_Granting_Date_Month_Error,
        Legal_Granting_Date_Year_Error,
        Goods_or_Services_Error,
        Spending_Region_Error,
        Spending_Sector_Error,

        SubsidyErrors,
        SubsidyArraySize,
        SubsidyFocus,

        isAddSubsidyPrimarycall,
      });
    } else {
      if (Subsidy_Objective_Global == "Other") {
        Subsidy_Objective_Plus_Other_Global =
          Subsidy_Objective_Global + "-" + Subsidy_Objective_Other_Global;
      } else {
        Subsidy_Objective_Plus_Other_Global = Subsidy_Objective_Global;
      }

      if (Subsidy_Instrument_Global == "Other") {
        Subsidy_Instrument_Plus_Other_Global =
          Subsidy_Instrument_Global + "-" + Subsidy_Instrument_Other_Global;
      } else {
        Subsidy_Instrument_Plus_Other_Global = Subsidy_Instrument_Global;
      }
      res.render("bulkupload/reviewdetail", {
        Subsidy_Control_Number_Global,
        Subsidy_Control_Number_Global_Substring,
        Subsidy_Measure_Title_Global,
        // Subsidy_Adhoc_Global,
        Subsidy_Objective_Global,
        Subsidy_Objective_Other_Global,
        Subsidy_Objective_Plus_Other_Global,
        Subsidy_Instrument_Global,
        Subsidy_Instrument_Other_Global,
        Subsidy_Instrument_Plus_Other_Global,
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
    }
  } else {
    res.render("bulkupload/subsidyaward-cancel");
  }
});

router.get("/", (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  res.render("bulkupload/reviewdetail");
});

module.exports = router;
