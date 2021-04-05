const express = require("express");
var session = require("express-session");
const axios = require("axios");
const router = express.Router();

router.post("/", async (req, res) => {
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
    ssn.SubsidyErrors = [];
    ssn.SubsidyFocus = [];
    Additem = 0;
    ssn.SubsidyArraySize = 0;
    ssn.Subsidy_Control_Number_Error = false;
    ssn.Subsidy_Measure_Title_Error = false;
    ssn.SC_Not_active = false;
    // ssn.Subsidy_Adhoc_Error = false;
    ssn.Subsidy_Objective_Error = false;
    ssn.Subsidy_Objective_Other_Error = false;
    ssn.Subsidy_Objective_Other_255_Error = false;
    ssn.Subsidy_Instrument_Other_255_Error = false;
    ssn.Beneficiary_Name_255_Error = false;
    ssn.Subsidy_Instrument_Error = false;
    ssn.Subsidy_Instrument_Other_Error = false;
    ssn.Subsidy_Element_Full_Amount_Error = false;
    ssn.Subsidy_Full_Amount_Range_Error = false;
    ssn.Subsidy_Element_Full_Amount_Exceed_Error = false;
    ssn.Subsidy_Full_Amount_Range_Exceed_Error = false;
    ssn.National_ID_Type_Error = false;
    ssn.National_ID_Number_Error = false;
    ssn.Beneficiary_Name_Error = false;
    ssn.Size_of_the_Organisation_Error = false;
    ssn.Granting_Authority_Name_Error = false;
    ssn.Granting_Authority_Valid_Name_Error = false;
    ssn.Legal_Granting_Date_Day_Error = false;
    ssn.Legal_Granting_Date_Month_Error = false;
    ssn.Legal_Granting_Date_Year_Error = false;
    ssn.Goods_or_Services_Error = false;
    ssn.Spending_Region_Error = false;
    ssn.Spending_Sector_Error = false;

    var {
      Subsidy_Control_Number_Name,
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

    // console.log("isAddSubsidyPrimarycall: " + isAddSubsidyPrimarycall);
    // console.log("Subsidy_Instrument :" + ssn.Subsidy_Instrument);
    // console.log("buttonvalue:" + buttonvalue);
    // console.log("mylink:" + mylink);
    // console.log("Granting_Authority_Name from award: " + Granting_Authority_Name);

    // console.log("  Subsidy_Adhoc :" + Subsidy_Adhoc);

    ssn.Subsidy_Control_Number_Name_Global = Subsidy_Control_Number_Name;
    // ssn.Subsidy_Measure_Title_Global = Subsidy_Measure_Title;
    // ssn.Subsidy_Adhoc_Global = Subsidy_Adhoc;
    ssn.Subsidy_Objective_Global = Subsidy_Objective;
    ssn.Subsidy_Objective_Other_Global = Subsidy_Objective_Other;
    ssn.Subsidy_Instrument_Global = Subsidy_Instrument;
    ssn.Subsidy_Instrument_Other_Global = Subsidy_Instrument_Other;

    if (
      ssn.Subsidy_Instrument_Global !==
      "Tax measures (tax credit, or tax/duty exemption)"
    ) {
      ssn.Subsidy_Element_Full_Amount_Global = Subsidy_Element_Full_Amount;
    } else {
      ssn.Subsidy_Element_Full_Amount_Global = "n/a";
    }

    if (
      ssn.Subsidy_Instrument_Global ==
      "Tax measures (tax credit, or tax/duty exemption)"
    ) {
      ssn.Subsidy_Full_Amount_Range_Global = Subsidy_Full_Amount_Range;
    } else {
      ssn.Subsidy_Full_Amount_Range_Global = "n/a";
    }

    ssn.National_ID_Type_Global = National_ID_Type;
    ssn.National_ID_Number_Global = National_ID_Number;
    ssn.Beneficiary_Name_Global = Beneficiary_Name;
    ssn.Size_of_the_Organisation_Global = Size_of_the_Organisation;
    if (ssn.dashboard_roles == "BEIS Administrator") {
      ssn.Granting_Authority_Name_Global = Granting_Authority_Name;
    } else {
      ssn.Granting_Authority_Name_Global = ssn.dashboard_ga_name;
      Granting_Authority_Name = ssn.dashboard_ga_name;
    }
    ssn.Legal_Granting_Date_Day_Global = Legal_Granting_Date_Day;
    ssn.Legal_Granting_Date_Month_Global = Legal_Granting_Date_Month;
    ssn.Legal_Granting_Date_Year_Global = Legal_Granting_Date_Year;
    ssn.Goods_or_Services_Global = Goods_or_Services;
    ssn.Spending_Region_Global = Spending_Region;
    ssn.Spending_Sector_Global = Spending_Sector;

    if (ssn.Legal_Granting_Date_Month_Global == 1) {
      ssn.GetMonthName = "January";
    }
    if (ssn.Legal_Granting_Date_Month_Global == 2) {
      ssn.GetMonthName = "February";
    }
    if (ssn.Legal_Granting_Date_Month_Global == 3) {
      ssn.GetMonthName = "March";
    }
    if (ssn.Legal_Granting_Date_Month_Global == 4) {
      ssn.GetMonthName = "April";
    }
    if (ssn.Legal_Granting_Date_Month_Global == 5) {
      ssn.GetMonthName = "May";
    }
    if (ssn.Legal_Granting_Date_Month_Global == 6) {
      ssn.GetMonthName = "June";
    }
    if (ssn.Legal_Granting_Date_Month_Global == 7) {
      ssn.GetMonthName = "July";
    }
    if (ssn.Legal_Granting_Date_Month_Global == 8) {
      ssn.GetMonthName = "August";
    }
    if (ssn.Legal_Granting_Date_Month_Global == 9) {
      ssn.GetMonthName = "September";
    }
    if (ssn.Legal_Granting_Date_Month_Global == 10) {
      ssn.GetMonthName = "October";
    }
    if (ssn.Legal_Granting_Date_Month_Global == 11) {
      ssn.GetMonthName = "November";
    }
    if (ssn.Legal_Granting_Date_Month_Global == 12) {
      ssn.GetMonthName = "December";
    }

    // console.log("ssn.Legal_Granting_Date_Month_Global" + ssn.GetMonthName);

    if (buttonvalue == "continue") {
      //Empty field validations

      if (!Subsidy_Control_Number_Name) {
        ssn.Subsidy_Control_Number_Error = true;
        ssn.SubsidyErrors[Additem] =
          "Enter the either subsidy control number (Or) subsidy scheme name";
        ssn.SubsidyFocus[Additem] = "#Subsidy_Control_Number";
        Additem = Additem + 1;
        // ssn.Subsidy_Measure_Title_Error = true;
        // ssn.SubsidyErrors[Additem] = "     Enter the subsidy scheme name";
        // ssn.SubsidyFocus[Additem] = "#Subsidy_Measure_Title";
        // Additem = Additem + 1;
      }

      // if (!Subsidy_Measure_Title) {

      // }
      // if (!Subsidy_Adhoc) {
      //   ssn.Subsidy_Adhoc_Error = true;
      //   ssn.SubsidyErrors[Additem] = "     Select the adhoc subsidy scheme";
      //   ssn.SubsidyFocus[Additem] = "#Subsidy_Adhoc";
      //   Additem = Additem + 1;
      // }

      if (Subsidy_Objective == "Empty") {
        ssn.Subsidy_Objective_Error = true;
        ssn.SubsidyErrors[Additem] = "     Select the subsidy purpose";
        ssn.SubsidyFocus[Additem] = "#Subsidy_Objective";
        Additem = Additem + 1;
      }

      if (Subsidy_Objective == "Other" && Subsidy_Objective_Other == "") {
        ssn.Subsidy_Objective_Other_Error = true;
        ssn.Subsidy_Objective_Other_255_Error = false;
        ssn.SubsidyErrors[Additem] =
          "     Enter the subsidy purpose for other category";
        ssn.SubsidyFocus[Additem] = "#Subsidy_Objective_Other";
        Additem = Additem + 1;
      }

      if (
        Subsidy_Objective == "Other" &&
        Subsidy_Objective_Other.length > 255
      ) {
        ssn.Subsidy_Objective_Other_255_Error = true;
        ssn.Subsidy_Objective_Other_Error = false;
        ssn.SubsidyErrors[Additem] =
          "Subsidy purpose-other length > 255 characters";
        ssn.SubsidyFocus[Additem] = "#Subsidy_Objective_Other";
        Additem = Additem + 1;
      }

      if (Subsidy_Instrument == "") {
        ssn.Subsidy_Instrument_Error = true;
        ssn.SubsidyErrors[Additem] = "     Select the subsidy type";
        ssn.SubsidyFocus[Additem] = "#Subsidy_Instrument";
        Additem = Additem + 1;
      }

      if (Subsidy_Instrument == "Other" && Subsidy_Instrument_Other == "") {
        ssn.Subsidy_Instrument_Other_Error = true;
        ssn.SubsidyErrors[Additem] =
          "     Enter the subsidy type for other category";
        ssn.SubsidyFocus[Additem] = "#Subsidy_Instrument_Other";
        Additem = Additem + 1;
      }

      if (
        Subsidy_Instrument == "Other" &&
        Subsidy_Instrument_Other.length > 255
      ) {
        ssn.Subsidy_Instrument_Other_255_Error = true;
        ssn.Subsidy_Instrument_Other_Error = false;
        ssn.SubsidyErrors[Additem] =
          "Subsidy purpose-other length > 255 characters";
        ssn.SubsidyFocus[Additem] = "#Subsidy_Objective_Other";
        Additem = Additem + 1;
      }

      console.log("subsidy element full amot : " + Subsidy_Element_Full_Amount);
      console.log("Subsidy_Full_Amount_Range : " + Subsidy_Full_Amount_Range);
      if (
        !Subsidy_Element_Full_Amount &&
        Subsidy_Instrument != "Tax measures (tax credit, or tax/duty exemption)"
      ) {
        ssn.Subsidy_Element_Full_Amount_Error = true;
        ssn.SubsidyErrors[Additem] =
          "     Enter the subsidy element full amount";
        ssn.SubsidyFocus[Additem] = "#Subsidy_Element_Full_Amount";
        Additem = Additem + 1;
      } else if (
        !Subsidy_Full_Amount_Range &&
        Subsidy_Instrument.includes("Tax measures")
      ) {
        ssn.Subsidy_Full_Amount_Range_Error = true;
        ssn.SubsidyErrors[Additem] = "     Enter the subsidy full amount range";
        ssn.SubsidyFocus[Additem] = "#Subsidy_Full_Amount_Range";
        Additem = Additem + 1;
      }

      if (!National_ID_Type) {
        ssn.National_ID_Type_Error = true;
        ssn.SubsidyErrors[Additem] = "     Choose the national id type";
        ssn.SubsidyFocus[Additem] = "#National_ID_Type";
        Additem = Additem + 1;
      }

      if (!National_ID_Number) {
        ssn.National_ID_Number_Error = true;
        ssn.SubsidyErrors[Additem] = "     Enter the national id number";
        ssn.SubsidyFocus[Additem] = "#National_ID_Number";
        Additem = Additem + 1;
      }

      if (!Beneficiary_Name) {
        ssn.Beneficiary_Name_Error = true;
        ssn.SubsidyErrors[Additem] =
          "     Enter the recipient organisation name";
        ssn.SubsidyFocus[Additem] = "#Beneficiary_Name";
        Additem = Additem + 1;
      }

      if (Beneficiary_Name.length > 255) {
        ssn.Beneficiary_Name_Error = false;
        ssn.Beneficiary_Name_255_Error = true;
        ssn.SubsidyErrors[Additem] =
          "Recipient organisation name can only be of 255 characters or less";
        ssn.SubsidyFocus[Additem] = "#Beneficiary_Name";
        Additem = Additem + 1;
      }

      if (!Size_of_the_Organisation) {
        ssn.Size_of_the_Organisation_Error = true;
        ssn.SubsidyErrors[Additem] = "     Choose the size of the organisation";
        ssn.SubsidyFocus[Additem] = "#Size_of_the_Organisation";
        Additem = Additem + 1;
      }

      if (!Granting_Authority_Name) {
        ssn.Granting_Authority_Name_Error = true;
        ssn.Granting_Authority_Valid_Name_Error = false;
        ssn.SubsidyErrors[Additem] = "     Enter the granting authority name";
        ssn.SubsidyFocus[Additem] = "#Granting_Authority_Name";
        Additem = Additem + 1;
      }

      if (!Legal_Granting_Date_Day) {
        ssn.Legal_Granting_Date_Day_Error = true;
        ssn.SubsidyErrors[Additem] =
          "     Enter the legal granting day of the date";
        ssn.SubsidyFocus[Additem] = "#Legal_Granting_Date_Day";
        Additem = Additem + 1;
      }

      // day validation starts here
      if (Legal_Granting_Date_Day != "") {
        if (Legal_Granting_Date_Day > 31 || Legal_Granting_Date_Day < 1) {
          ssn.Legal_Granting_Date_Day_Error = true;
          ssn.SubsidyErrors[Additem] =
            "     Enter the valid legal granting day of the date";
          ssn.SubsidyFocus[Additem] = "#Legal_Granting_Date_Day";
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
          ssn.Legal_Granting_Date_Day_Error = true;
          ssn.SubsidyErrors[Additem] = "     Enter the valid day";
          ssn.SubsidyFocus[Additem] = "#Legal_Granting_Date_Day";
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
            ssn.Legal_Granting_Date_Day_Error = true;
            ssn.SubsidyErrors[Additem] = "     Enter the valid day";
            ssn.SubsidyFocus[Additem] = "#Legal_Granting_Date_Day";
            Additem = Additem + 1;
          }
        }

        if (
          Legal_Granting_Date_Day == 30 &&
          Legal_Granting_Date_Month == parseInt("02", 8)
        ) {
          ssn.Legal_Granting_Date_Day_Error = true;
          ssn.SubsidyErrors[Additem] = "     Enter the valid day";
          ssn.SubsidyFocus[Additem] = "#Legal_Granting_Date_Day";
          Additem = Additem + 1;
        }
      }
      // day velidation ends here

      if (!Legal_Granting_Date_Month) {
        ssn.Legal_Granting_Date_Month_Error = true;
        ssn.SubsidyErrors[Additem] =
          "     Enter the legal granting month of the date";
        ssn.SubsidyFocus[Additem] = "#Legal_Granting_Date_Month";
        Additem = Additem + 1;
      }
      if (Legal_Granting_Date_Month != "") {
        if (Legal_Granting_Date_Month > 12 || Legal_Granting_Date_Month == 0) {
          ssn.Legal_Granting_Date_Month_Error = true;
          ssn.SubsidyErrors[Additem] =
            "     Enter the legal granting month from 1 to 12";
          ssn.SubsidyFocus[Additem] = "#Legal_Granting_Date_Month";
          Additem = Additem + 1;
        }
      }

      if (!Legal_Granting_Date_Year) {
        ssn.Legal_Granting_Date_Year_Error = true;
        ssn.SubsidyErrors[Additem] =
          "     Enter the legal granting year of the date";
        ssn.SubsidyFocus[Additem] = "#Legal_Granting_Date_Year";
        Additem = Additem + 1;
      }

      if (Legal_Granting_Date_Year != "") {
        if (Legal_Granting_Date_Year < 1960) {
          ssn.Legal_Granting_Date_Year_Error = true;
          ssn.SubsidyErrors[Additem] =
            " Enter the legal granting year of the date greater than 1960";
          ssn.SubsidyFocus[Additem] = "#Legal_Granting_Date_Year";
          Additem = Additem + 1;
        }
      }

      if (!Goods_or_Services) {
        ssn.Goods_or_Services_Error = true;
        ssn.SubsidyErrors[Additem] = "     Choose the Goods or Services";
        ssn.SubsidyFocus[Additem] = "#Goods_or_Services";
        Additem = Additem + 1;
      }

      if (Spending_Region == "Empty") {
        ssn.Spending_Region_Error = true;
        ssn.SubsidyErrors[Additem] = "     Select the spending region";
        ssn.SubsidyFocus[Additem] = "#Spending_Region";
      }

      if (Spending_Sector == "Empty") {
        ssn.Spending_Sector_Error = true;
        ssn.SubsidyErrors[Additem] = "     Select the spending sector";
        ssn.SubsidyFocus[Additem] = "#Spending_Sector";
      }

      ssn.SubsidyArraySize = ssn.SubsidyErrors.length;

      if (
        ssn.Subsidy_Control_Number_Error ||
        ssn.Subsidy_Measure_Title_Error ||
        // ssn.Subsidy_Adhoc_Error ||
        ssn.Subsidy_Objective_Error ||
        ssn.Subsidy_Objective_Other_Error ||
        ssn.Subsidy_Instrument_Error ||
        ssn.Subsidy_Instrument_Other_Error ||
        ssn.Subsidy_Element_Full_Amount_Error ||
        ssn.Subsidy_Full_Amount_Range_Error ||
        ssn.National_ID_Type_Error ||
        ssn.National_ID_Number_Error ||
        ssn.Beneficiary_Name_Error ||
        ssn.Size_of_the_Organisation_Error ||
        ssn.Granting_Authority_Name_Error ||
        ssn.Legal_Granting_Date_Day_Error ||
        ssn.Legal_Granting_Date_Month_Error ||
        ssn.Legal_Granting_Date_Year_Error ||
        ssn.Goods_or_Services_Error ||
        ssn.Spending_Region_Error ||
        ssn.Spending_Sector_Error
      ) {
        res.render("bulkupload/addsubsidyaward", {
          ssn,
          // Subsidy_Control_Number_Global,
          // ssn.Subsidy_Measure_Title_Global,
          // ssn.Subsidy_Adhoc_Global,
          // ssn.Subsidy_Objective_Global,
          // ssn.Subsidy_Objective_Other_Global,
          // ssn.Subsidy_Instrument_Global,
          // ssn.Subsidy_Instrument_Other_Global,
          // ssn.Subsidy_Element_Full_Amount_Global,
          // ssn.Subsidy_Full_Amount_Range_Global,
          // ssn.National_ID_Type_Global,
          // ssn.National_ID_Number_Global,
          // ssn.Beneficiary_Name_Global,
          // ssn.Size_of_the_Organisation_Global,
          // ssn.Granting_Authority_Name_Global,
          // ssn.Legal_Granting_Date_Day_Global,
          // ssn.Legal_Granting_Date_Month_Global,
          // ssn.Legal_Granting_Date_Year_Global,
          // ssn.Goods_or_Services_Global,
          // ssn.Spending_Region_Global,
          // ssn.Spending_Sector_Global,

          // ssn.Subsidy_Control_Number_Error,
          // ssn.Subsidy_Measure_Title_Error,
          // ssn.Subsidy_Adhoc_Error,
          // ssn.Subsidy_Objective_Error,
          // ssn.Subsidy_Objective_Other_Error,
          // ssn.Subsidy_Instrument_Error,
          // ssn.Subsidy_Instrument_Other_Error,
          // ssn.Subsidy_Element_Full_Amount_Error,
          // ssn.Subsidy_Full_Amount_Range_Error,
          // ssn.National_ID_Type_Error,
          // ssn.National_ID_Number_Error,
          // ssn.Beneficiary_Name_Error,
          // ssn.Size_of_the_Organisation_Error,
          // ssn.Granting_Authority_Name_Error,
          // ssn.Legal_Granting_Date_Day_Error,
          // ssn.Legal_Granting_Date_Month_Error,
          // ssn.Legal_Granting_Date_Year_Error,
          // ssn.Goods_or_Services_Error,
          // Spending_Region_Error,
          // ssn.Spending_Sector_Error,

          // ssn.SubsidyErrors,
          // ssn.SubsidyArraySize,
          // ssn.SubsidyFocus,

          // isAddSubsidyPrimarycall,
        });
      } else {
        if (ssn.Subsidy_Objective_Global == "Other") {
          ssn.Subsidy_Objective_Plus_Other_Global =
            ssn.Subsidy_Objective_Global +
            "-" +
            ssn.Subsidy_Objective_Other_Global;
        } else {
          ssn.Subsidy_Objective_Plus_Other_Global =
            ssn.Subsidy_Objective_Global;
        }

        if (ssn.Subsidy_Instrument_Global == "Other") {
          ssn.Subsidy_Instrument_Plus_Other_Global =
            ssn.Subsidy_Instrument_Global +
            "-" +
            ssn.Subsidy_Instrument_Other_Global;
        } else {
          ssn.Subsidy_Instrument_Plus_Other_Global =
            ssn.Subsidy_Instrument_Global;
        }
        try {
          const data_request = {
            searchName: Subsidy_Control_Number_Name,
            pageNumber: 1,
            totalRecordsPerPage: 10,
            sortBy: ["subsidyMeasureTitle,asc"],
            status: "",
          };

          const apidata = await axios.post(
            beis_url_searchscheme + "/scheme/search",
            data_request,
            ssn.UserPrincileObjectGlobal
          );

          searchschemes = apidata.data;

          ssn.Subsidy_Measure_Title_Global =
            searchschemes.schemes[0].subsidyMeasureTitle;
          ssn.Subsidy_Control_Number_Global = searchschemes.schemes[0].scNumber;
          ssn.Subsidy_Control_Number_Global_Substring = ssn.Subsidy_Control_Number_Global.substring(
            2,
            10
          );
          console.log("Status: " + JSON.stringify(searchschemes));
          if (searchschemes.schemes.length == 1) {
            ssn.Subsidy_Measure_Title_Global =
              searchschemes.schemes[0].subsidyMeasureTitle;
            ssn.Subsidy_Control_Number_Global =
              searchschemes.schemes[0].scNumber;
            ssn.Subsidy_Control_Number_Global_Substring = ssn.Subsidy_Control_Number_Global.substring(
              2,
              10
            );
            if (searchschemes.schemes[0].status == "Inactive") {
              // ssn.Subsidy_Control_Number_Error = true;
              ssn.SubsidyErrors[Additem] =
                "Subsidy control number is not active";
              ssn.SubsidyFocus[Additem] = "#Subsidy_Control_Number";
              Additem = Additem + 1;
              ssn.SubsidyArraySize = 1;
              ssn.SC_Not_active = true;
              res.render("bulkupload/addsubsidyaward", {
                ssn,
              });
            } else {
              res.render("bulkupload/reviewdetail", {
                ssn,
              });
            }
          } else {
            for (var item = 0; item < searchschemes.schemes.length; i++) {
              // searchschemes.schemes.forEach(function (item) {
              console.log(item.status);
              if (searchschemes.schemes[item].status === "Active") {
                ssn.Subsidy_Measure_Title_Global =
                  searchschemes.schemes[item].subsidyMeasureTitle;
                ssn.Subsidy_Control_Number_Global =
                  searchschemes.schemes[item].scNumber;
                ssn.Subsidy_Control_Number_Global_Substring = ssn.Subsidy_Control_Number_Global.substring(
                  2,
                  10
                );
                break;
                // return false;
              }
            }
            // });

            res.render("bulkupload/reviewdetail", {
              ssn,
              // Subsidy_Control_Number_Global,
              // ssn.Subsidy_Control_Number_Global_Substring,
              // ssn.Subsidy_Measure_Title_Global,
              // ssn.Subsidy_Adhoc_Global,
              // ssn.Subsidy_Objective_Global,
              // ssn.Subsidy_Objective_Other_Global,
              // ssn.Subsidy_Objective_Plus_Other_Global,
              // ssn.Subsidy_Instrument_Global,
              // ssn.Subsidy_Instrument_Other_Global,
              // Subsidy_Instrument_Plus_Other_Global,
              // ssn.Subsidy_Element_Full_Amount_Global,
              // ssn.Subsidy_Full_Amount_Range_Global,
              // ssn.National_ID_Type_Global,
              // ssn.National_ID_Number_Global,
              // ssn.Beneficiary_Name_Global,
              // ssn.Size_of_the_Organisation_Global,
              // ssn.Granting_Authority_Name_Global,
              // ssn.Legal_Granting_Date_Day_Global,
              // ssn.Legal_Granting_Date_Month_Global,
              // ssn.Legal_Granting_Date_Year_Global,
              // ssn.Goods_or_Services_Global,
              // ssn.Spending_Region_Global,
              // ssn.Spending_Sector_Global,
              // ssn.GetMonthName,
            });
          }
        } catch (err) {
          if (err.toString().includes("404")) {
            ssn.Subsidy_Control_Number_Error = true;
            ssn.SubsidyErrors[Additem] =
              "Either subsidy control number (Or) subsidy scheme name is not valid";
            ssn.SubsidyFocus[Additem] = "#Subsidy_Control_Number";
            Additem = Additem + 1;
            ssn.SubsidyArraySize = 1;
            res.render("bulkupload/addsubsidyaward", {
              ssn,
            });
          }
          console.log("error in scheme", err);
        }
      }
    } else {
      res.render("bulkupload/subsidyaward-cancel");
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

    res.render("bulkupload/reviewdetail");
  }
});

module.exports = router;
