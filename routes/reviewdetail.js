// ********************************************************************
// Gov.UK transparency subsidy award review details module
// ********************************************************************

const express = require("express");
var session = require("express-session");
const axios = require("axios");
const e = require("express");
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
    ssn.GetConfirmationMonthName = "";
    ssn.GetMonthName = "";
    ssn.Admin_Program_Name_Global = "";
    ssn.SubsidyErrors = [];
    ssn.SubsidyFocus = [];
    Additem = 0;
    ssn.SubsidyArraySize = 0;
    ssn.Subsidy_Control_Number_Error = false;
    ssn.Subsidy_Measure_Title_Error = false;
    ssn.SC_Not_active = false;
    ssn.Name_Not_active = false;
    ssn.Multiple_Active_Schemes = false;
    ssn.Award_Date_Not_Valid_Error = false;
    ssn.Subsidy_Objective_Error = false;
    ssn.Subsidy_Objective_Other_Error = false;
    ssn.Subsidy_Objective_Other_255_Error = false;
    ssn.Subsidy_Instrument_Other_255_Error = false;
    ssn.Beneficiary_Name_255_Error = false;
    ssn.Subsidy_Instrument_Error = false;
    ssn.Subsidy_Instrument_Other_Error = false;
    ssn.Subsidy_Element_Full_Amount_Error = false;
    ssn.Subsidy_Full_Amount_Range_Bounding_Error = false;
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
    ssn.SchemeCountError = false;
    ssn.Standalone_Award_Error = false;
    ssn.Subsidy_Award_Description_Error = false;
    ssn.Subsidy_Award_Description_Error_Length = false;
    ssn.Admin_Program_Error = false;
    ssn.Admin_Program_255_Error = false;
    ssn.Admin_Program_Exist_Error = false;
    ssn.Admin_Program_Active_Error = false;
    ssn.Admin_Program_Match_Error = false;
    ssn.Subsidy_Award_Interest_Error = false;


    var {
      Subsidy_Control_Number_Name,
      // Subsidy_Adhoc,
      Subsidy_Award_Description,
      Subsidy_Objective,
      Subsidy_Objective_Other,
      Subsidy_Instrument,
      Subsidy_Instrument_Other,
      Subsidy_Element_Full_Amount,
      Subsidy_Full_Amount_Range_Lower,
      Subsidy_Full_Amount_Range_Upper,
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
      Standalone_Award,
      Admin_Program_Number,
      Authority_URL,
      Authority_URL_Description,
      mylink,
      Subsidy_Award_Interest
    } = req.body;

    ssn.Standalone_Award_Global = Standalone_Award;
    if(ssn.Standalone_Award_Global == 'Yes'){
      ssn.Subsidy_Control_Number_Name_Global = "";
      ssn.Admin_Program_Number_Global = "";
      ssn.Authority_URL_Global = Authority_URL;
      ssn.Authority_URL_Description_Global = Authority_URL_Description;
    }else{
      ssn.Authority_URL_Global = "";
      ssn.Authority_URL_Description_Global = "";
      ssn.Admin_Program_Number_Global = Admin_Program_Number;
      ssn.Subsidy_Control_Number_Name_Global = Subsidy_Control_Number_Name;
    }

    ssn.Subsidy_Award_Description_Global = Subsidy_Award_Description;
    ssn.Subsidy_Objective_Global = Subsidy_Objective;
    ssn.Subsidy_Objective_Other_Global = Subsidy_Objective_Other;
    ssn.Subsidy_Instrument_Global = Subsidy_Instrument;
    ssn.Subsidy_Instrument_Other_Global = Subsidy_Instrument_Other;
    ssn.Subsidy_Full_Amount_Range_Lower_Global = Subsidy_Full_Amount_Range_Lower;
    ssn.Subsidy_Full_Amount_Range_Upper_Global = Subsidy_Full_Amount_Range_Upper;

    Subsidy_Full_Amount_Range = "£" + Subsidy_Full_Amount_Range_Lower + " - £" + Subsidy_Full_Amount_Range_Upper;

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
    ssn.Subsidy_Award_Interest_Global = Subsidy_Award_Interest;

    console.log("Subsidy_Objective_Other", Subsidy_Objective_Other.length);
    console.log("Subsidy_Instrument_Other", Subsidy_Instrument_Other);
    console.log("Beneficiary_Name", Beneficiary_Name);
    console.log("Subsidy_Objective", Subsidy_Objective);
    console.log("ssn.Subsidy_Award_Interest :" + ssn.Subsidy_Award_Interest_Global)
    console.log("buttonvalue", buttonvalue);

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

      if(!Standalone_Award) {
        ssn.Standalone_Award_Error = true;
        ssn.SubsidyErrors[Additem] =
          "You must specify the standalone status of the subsidy award.";
        ssn.SubsidyFocus[Additem] = '#Standalong_Award_h1';
        Additem = Additem + 1;
      }

      if(Standalone_Award != 'Yes'){
        if (!Subsidy_Control_Number_Name) {
          ssn.Subsidy_Control_Number_Error = true;
          ssn.SubsidyErrors[Additem] =
            "You must enter either a subsidy control number or a subsidy scheme title.";
          ssn.SubsidyFocus[Additem] = "#Subsidy_Control_Number";
          Additem = Additem + 1;
        }
        if (
          Subsidy_Control_Number_Name != "" &&
          Subsidy_Control_Number_Name.length > 255
        ) {
          ssn.Subsidy_Measure_Title_Error = true;
          ssn.SubsidyErrors[Additem] =
            "The subsidy scheme name must be less than 255 characters. ";
          ssn.SubsidyFocus[Additem] = "#Subsidy_Control_Number";
          Additem = Additem + 1;
        }

        if(Admin_Program_Number != "" &&
            Admin_Program_Number.length > 255){
          ssn.Admin_Program_Error = true;
          ssn.Admin_Program_255_Error = true;

          ssn.SubsidyErrors[Additem] =
          "Admin program number must be no greater than 255 characters";
          ssn.SubsidyFocus[Additem] = '#AdminProgramContainer';
          Additem = Additem + 1;
        }
      }

      if (Standalone_Award.toLowerCase() != 'no' && !Subsidy_Award_Interest) {
        ssn.Subsidy_Award_Interest_Error = true;
        ssn.SubsidyErrors.push("You must select the if the award is of interest, particular interest or neither");
        ssn.SubsidyFocus.push("#Subsidy_Award_Interest");
      }

      if(Subsidy_Award_Description.length > 10000){
          ssn.Subsidy_Award_Description_Error_Length = true;
          ssn.SubsidyErrors[Additem] =
            "The subsidy award description must be 10000 characters or less.";
          ssn.SubsidyFocus[Additem] = "#subsidy-award-description-container";
          Additem = Additem + 1;
      }

      if (Subsidy_Objective == "") {
        ssn.Subsidy_Objective_Error = true;
        ssn.SubsidyErrors[Additem] =
          " You must select the purpose of the subsidy.";
        ssn.SubsidyFocus[Additem] = "#Subsidy_Objective";
        Additem = Additem + 1;
      }

      if (Subsidy_Objective == "Other" && Subsidy_Objective_Other == "") {
        ssn.Subsidy_Objective_Other_Error = true;
        ssn.Subsidy_Objective_Other_255_Error = false;
        ssn.SubsidyErrors[Additem] =
          "You must enter the details of the subsidy purpose.";
        ssn.SubsidyFocus[Additem] = "#Subsidy_Objective_Other";
        Additem = Additem + 1;
      }

      if (
        Subsidy_Objective == "Other" &&
        Subsidy_Objective_Other.length > 249
      ) {
        ssn.Subsidy_Objective_Other_255_Error = true;
        ssn.Subsidy_Objective_Other_Error = false;
        ssn.SubsidyErrors[Additem] =
          "The subsidy purpose must be less than 255 characters.";
        ssn.SubsidyFocus[Additem] = "#Subsidy_Objective_Other";
        Additem = Additem + 1;
      }

      if (Subsidy_Instrument == "") {
        ssn.Subsidy_Instrument_Error = true;
        ssn.SubsidyErrors[Additem] = "You must select a subsidy form.";
        ssn.SubsidyFocus[Additem] = "#Subsidy_Instrument";
        Additem = Additem + 1;
      }

      if (Subsidy_Instrument == "Other" && Subsidy_Instrument_Other == "") {
        ssn.Subsidy_Instrument_Other_Error = true;
        ssn.SubsidyErrors[Additem] =
          "You must enter the details of the subsidy form";
        ssn.SubsidyFocus[Additem] = "#Subsidy_Instrument_Other";
        Additem = Additem + 1;
      }

      if (
        Subsidy_Instrument == "Other" &&
        Subsidy_Instrument_Other.length > 249
      ) {
        ssn.Subsidy_Instrument_Other_255_Error = true;
        ssn.Subsidy_Instrument_Other_Error = false;
        ssn.SubsidyErrors[Additem] =
          "The subsidy form must be less than 255 characters. ";
        ssn.SubsidyFocus[Additem] = "#Subsidy_Instrument_Other";
        Additem = Additem + 1;
      }

      console.log("subsidy element full amount : " + Subsidy_Element_Full_Amount);
      console.log("Subsidy_Full_Amount_Range : " + Subsidy_Full_Amount_Range);
      if (
        !Subsidy_Element_Full_Amount &&
        Subsidy_Instrument != "Tax measures (tax credit, or tax/duty exemption)"
      ) {
        ssn.Subsidy_Element_Full_Amount_Error = true;
        ssn.SubsidyErrors[Additem] = "You must enter the subsidy amount.";
        ssn.SubsidyFocus[Additem] = "#Subsidy_Element_Full_Amount";
        Additem = Additem + 1;
      }

      if (Subsidy_Instrument == "Tax measures (tax credit, or tax/duty exemption)"){
        if (!Subsidy_Full_Amount_Range_Lower || !Subsidy_Full_Amount_Range_Upper) {
          ssn.Subsidy_Full_Amount_Range_Error = true;
          ssn.SubsidyErrors[Additem] =
            " You must enter both values of a subsidy full amount range";
          ssn.SubsidyFocus[Additem] = "#Subsidy_Full_Amount_Range";
          Additem = Additem + 1;
        }

        if ((parseInt(Subsidy_Full_Amount_Range_Lower) >= parseInt(Subsidy_Full_Amount_Range_Upper)) && Subsidy_Full_Amount_Range_Upper != "") {
          ssn.Subsidy_Full_Amount_Range_Bounding_Error = true;
          ssn.SubsidyErrors[Additem] =
            " The lower bound of the subsidy tax range cannot be larger than or equal to the upper bound";
          ssn.SubsidyFocus[Additem] = "#Subsidy_Full_Amount_Range";
          Additem = Additem + 1;
        }
      }

      if (!National_ID_Type) {
        ssn.National_ID_Type_Error = true;
        ssn.SubsidyErrors[Additem] =
          "You must select an ID type for the recipient organisation.";
        ssn.SubsidyFocus[Additem] = "#National_ID_Type";
        Additem = Additem + 1;
      }

      if (!National_ID_Number) {
        ssn.National_ID_Number_Error = true;
        ssn.SubsidyErrors[Additem] =
          "You must enter an ID number for the ID type that you have selected.";
      ssn.SubsidyFocus[Additem] = "#National_ID_Number";
        Additem = Additem + 1;
      }

      if (!Beneficiary_Name) {
        ssn.Beneficiary_Name_Error = true;
        ssn.SubsidyErrors[Additem] =
          "You must enter the name of the recipient organisation";
        ssn.SubsidyFocus[Additem] = "#Beneficiary_Name";
        Additem = Additem + 1;
      }

      if (Beneficiary_Name != "" && Beneficiary_Name.length > 255) {
        ssn.Beneficiary_Name_Error = false;
        ssn.Beneficiary_Name_255_Error = true;
        ssn.SubsidyErrors[Additem] =
          "The recipient name must be less than 255 characters.";
        ssn.SubsidyFocus[Additem] = "#Beneficiary_Name";
        Additem = Additem + 1;
      }

      if (!Size_of_the_Organisation) {
        ssn.Size_of_the_Organisation_Error = true;
        ssn.SubsidyErrors[Additem] = "You must select an organisation size. ";
        ssn.SubsidyFocus[Additem] = "#Size_of_the_Organisation";
        Additem = Additem + 1;
      }

      if (!Granting_Authority_Name) {
        ssn.Granting_Authority_Name_Error = true;
        ssn.Granting_Authority_Valid_Name_Error = false;
        ssn.SubsidyErrors[Additem] =
          "You must enter the name of the public authority.";
        ssn.SubsidyFocus[Additem] = "#Granting_Authority_Name";
        Additem = Additem + 1;
      }

      if (!Legal_Granting_Date_Day) {
        ssn.Legal_Granting_Date_Day_Error = true;
        ssn.SubsidyErrors[Additem] =
          "You must enter the date that the subsidy was awarded.";
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
        ssn.SubsidyErrors[Additem] =
          "You must select what the recipient organisation provides. This will be either goods or services.";
        ssn.SubsidyFocus[Additem] = "#Goods_or_Services";
        Additem = Additem + 1;
      }

      if (Spending_Region == "") {
        ssn.Spending_Region_Error = true;
        ssn.SubsidyErrors[Additem] =
          "You must select the region that the recipient organisation is based in.";
        ssn.SubsidyFocus[Additem] = "#Spending_Region";
        Additem = Additem + 1;
      }

      if (Spending_Sector == "") {
        ssn.Spending_Sector_Error = true;
        ssn.SubsidyErrors[Additem] =
          "You must select the sector that the recipient organisation belongs to.";
        ssn.SubsidyFocus[Additem] = "#Spending_Sector";
        Additem = Additem + 1;
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
        ssn.Subsidy_Full_Amount_Range_Bounding_Error ||
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
        ssn.Spending_Sector_Error ||
        ssn.Subsidy_Objective_Other_255_Error ||
        ssn.Subsidy_Instrument_Other_255_Error ||
        ssn.Beneficiary_Name_255_Error ||
        ssn.Standalone_Award_Error ||
        ssn.Subsidy_Award_Description_Error ||
        ssn.Subsidy_Award_Description_Error_Length ||
        ssn.Subsidy_Award_Interest_Error
      ) {
        res.render("bulkupload/addsubsidyaward", {
          ssn,
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
          schemeError = false;
          if(Standalone_Award != 'Yes'){
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

            console.log("Status: " + JSON.stringify(searchschemes));

            if (searchschemes.schemes.length > 1) {
              var activeCount = 0;
              var activeIndex;
              searchschemes.schemes.forEach(function (scheme, index){
                if (scheme.status == "Active"){
                  activeCount = activeCount + 1;
                  activeIndex = index;
                }
              });

              switch(true){
                case (activeCount == 0): //error
                  ssn.SubsidyErrors[Additem] = "There are no active schemes matching criteria.";
                  ssn.SubsidyFocus[Additem] = "#Subsidy_Control_Number";
                  Additem = Additem + 1;
                  ssn.Name_Not_active = true;
                  schemeError = true;
                  break;
                case (activeCount == 1): // use this
                  var tempScheme = searchschemes.schemes[activeIndex];
                  searchschemes.schemes.length = 0;
                  searchschemes.schemes[0] = tempScheme;
                  break;
                case (activeCount > 1): //error
                  ssn.SubsidyErrors[Additem] = "There are multiple active schemes matching criteria.";
                  ssn.SubsidyFocus[Additem] = "#Subsidy_Control_Number";
                  Additem = Additem + 1;
                  ssn.Multiple_Active_Schemes = true;
                  schemeError = true;
                  break;
              }
            }
            if (searchschemes.schemes.length == 1) {
              ssn.Subsidy_Measure_Title_Global =
                searchschemes.schemes[0].subsidyMeasureTitle;
              ssn.Subsidy_Control_Number_Global =
                searchschemes.schemes[0].scNumber;
              ssn.Subsidy_Control_Number_Global_Substring = ssn.Subsidy_Control_Number_Global.substring(
                2,
                10
              );

              if (searchschemes.schemes[0].status != "Active") {
                ssn.SubsidyErrors[Additem] =
                  "Subsidy control number is not active";
                ssn.SubsidyFocus[Additem] = "#Subsidy_Control_Number";
                Additem = Additem + 1;
                ssn.SubsidyArraySize = ssn.SubsidyArraySize + 1;
                ssn.SC_Not_active = true;
                schemeError = true;
              }
              startDateObj = new Date(searchschemes.schemes[0].startDate);
              endDateObj = new Date(searchschemes.schemes[0].endDate);
              MonthInt = parseInt(Legal_Granting_Date_Month) - 1;
              MonthStr = MonthInt.toString();
              awardDateObj = new Date(Legal_Granting_Date_Year, MonthStr, Legal_Granting_Date_Day);
              if ((awardDateObj > endDateObj) || (awardDateObj < startDateObj)) {
                ssn.Award_Date_Not_Valid_Error = true;
                if(searchschemes.schemes[0].endDate == ''){
                ssn.SubsidyErrors[Additem] =
                "Granting date is not valid, it must be on or after "+searchschemes.schemes[0].startDate;
              }else{
                ssn.SubsidyErrors[Additem] =
                    "Granting date is not valid, it must be between "+searchschemes.schemes[0].startDate+" and "+searchschemes.schemes[0].endDate+" inclusive";
                }
              ssn.SubsidyFocus[Additem] = "#Legal_Granting_Date";
                Additem = Additem + 1;
                ssn.SubsidyArraySize = ssn.SubsidyArraySize + 1;
                schemeError = true;
              }
            }
          }
        } catch (err) {
          if (err.toString().includes("404")) {
            ssn.Subsidy_Control_Number_Error = true;
            schemeError = true;
            ssn.SubsidyErrors[Additem] =
              "Either subsidy control number (Or) subsidy scheme name is not valid";
            ssn.SubsidyFocus[Additem] = "#Subsidy_Control_Number";
            Additem = Additem + 1;
            ssn.SubsidyArraySize = 1;
          }
          console.log("error in scheme", err);
        }

        if(Standalone_Award != 'Yes' && ssn.Admin_Program_Number_Global.trim() != ""){
          var endpoint = beis_url_searchscheme + "/adminprogram/" + ssn.Admin_Program_Number_Global.trim();
          try {
            const apiData = await axios.get(
              endpoint,
              ssn.UserPrincileObjectGlobal
            );

            adminProgram = apiData.data;

            ssn.Admin_Program_Name_Global = adminProgram.adminProgramName;

            if(adminProgram.status.toLowerCase() != "active"){
              ssn.Admin_Program_Error = true;
              ssn.Admin_Program_Active_Error = true;
              ssn.SubsidyErrors[Additem] =
                "Admin program is not active";
                ssn.SubsidyFocus[Additem] = '#AdminProgramContainer';
                Additem = Additem + 1;
                ssn.SubsidyArraySize = ssn.SubsidyArraySize + 1;
            }

            if(ssn.Standalone_Award_Global.toLowerCase() != "yes"){
              if(ssn.Subsidy_Control_Number_Global.toUpperCase() != adminProgram.subsidyMeasure.scNumber.toUpperCase()){
                ssn.Admin_Program_Error = true;
                ssn.Admin_Program_Match_Error = true;
                ssn.SubsidyErrors[Additem] =
                  "Admin program scheme must match that of the award scheme";
                  ssn.SubsidyFocus[Additem] = '#AdminProgramContainer';
                  Additem = Additem + 1;
                  ssn.SubsidyArraySize = ssn.SubsidyArraySize + 1;
              }
            }

          }catch (err){
            if (err.toString().includes("404")) {
              ssn.Admin_Program_Error = true;
              ssn.Admin_Program_Exist_Error = true;
              ssn.SubsidyErrors[Additem] =
                "Admin program does not exist";
              ssn.SubsidyFocus[Additem] = "#AdminProgramContainer";
              Additem = Additem + 1;
              ssn.SubsidyArraySize = ssn.SubsidyArraySize + 1;
            }
          }
        }

        if (schemeError || ssn.Admin_Program_Error) {
          res.render("bulkupload/addsubsidyaward", {
            ssn,
          });
        } else {
          res.render("bulkupload/reviewdetail", {
            ssn,
          });
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
