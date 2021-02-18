// ***********************************************************
// Automated Unit testing scripts for search results award route
// ***********************************************************

const index = require("../app");
const request = require("supertest");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", index);
const axios = require("axios");
jest.mock("axios");
const mockRequest = (sessionData, body) => ({
  session: { data: sessionData },
  body,
});

test("Unit testing for Subsidy Scheme Edit Test for GET call", (done) => {
  const req = mockRequest();
  const res = {};
  global.beis_url_searchscheme = "";
  global.beis_url_accessmanagement = "";
  global.Subsidy_Measure_Title_Global = "";
  global.Subsidy_Adhoc_Global = "";

  global.Search_Text_Global = "";
  global.current_page = "";
  global.frontend_totalRecordsPerPage = "";
  global.sorting_order_pass = "";

  global.subsidy_scheme_name_sorting_order = "asc";
  global.subsidy_scheme_name_arrow = "downdecending";
  global.subsidy_control_no_arrow = "upanddown";
  global.granting_authority_arrow = "upanddown";
  global.start_date_arrow = "upanddown";
  global.end_date_arrow = "upanddown";
  global.duration_arrow = "upanddown";
  global.budget_arrow = "upanddown";
  global.subsidy_scheme_name_sorting_order = "desc";

  global.awards_status = "Filter results by status";
  global.frontend_totalRecordsPerPage = 10;
  global.subsidy_scheme_name_arrow = "";
  global.subsidy_control_no_arrow = "";

  global.searchawards = {
    totalSearchResults: 10,
    currentPage: 1,
    totalPages: 1,
    schemes: [
      {
        subsidyMeasureTitle: "",
        scNumber: "",
        gaName: "",
        startDate: "",
        endDate: "",
        duration: "",
        budget: "",
      },
    ],
  };
  global.schemes_status = "";
  global.pageCount = 10;
  global.current_page_active = 1;
  global.previous_page = "";
  global.next_page = 2;
  global.start_record = 1;
  global.end_record = 10;
  global.totalrows = 10;
  axios.post.mockResolvedValue({
    status: 200,
    data: {
      totalSearchResults: 10,
      currentPage: 1,
      totalPages: 1,
      allScheme: "",
      activeScheme: "",
      inactiveScheme: "",
      schemes: [
        {
          subsidyMeasureTitle: "",
          scNumber: "",
          gaName: "",
          startDate: "",
          endDate: "",
          duration: "",
          budget: "",
        },
      ],
    },
  });

  request(app)
    .get("/measuresortroute", (req, res))
    .query({ page: "Scheme_Name" })
    .expect(200, done);
  //   expect(acd).toBe(200);
});

test("Unit testing for Subsidy Scheme Edit Test for GET call", (done) => {
  const req = mockRequest();
  const res = {};
  global.beis_url_searchscheme = "";
  global.beis_url_accessmanagement = "";

  global.Subsidy_Measure_Title_Global = "";
  global.Subsidy_Adhoc_Global = "";

  global.Search_Text_Global = "";
  global.current_page = "";
  global.frontend_totalRecordsPerPage = "";
  global.sorting_order_pass = "";

  global.subsidy_scheme_name_sorting_order = "";
  global.subsidy_scheme_name_arrow = "upacending";
  global.subsidy_control_no_arrow = "upanddown";
  global.granting_authority_arrow = "upanddown";
  global.start_date_arrow = "upanddown";
  global.end_date_arrow = "upanddown";
  global.duration_arrow = "upanddown";
  global.budget_arrow = "upanddown";
  global.subsidy_scheme_name_sorting_order = "asc";

  global.awards_status = "Filter results by status";
  global.frontend_totalRecordsPerPage = 10;
  global.subsidy_scheme_name_arrow = "";
  global.subsidy_control_no_arrow = "";
  global.end_date_arrow = "";
  global.duration_arrow = "";
  global.budget_arrow = "";

  global.searchawards = {
    activeScheme: "",
    allScheme: "",
    inactiveScheme: "",
    schemes: [
      {
        subsidyMeasureTitle: "",
        scNumber: "",
        gaName: "",
        startDate: "",
        endDate: "",
        duration: "",
        budget: "",
      },
    ],
  };

  global.schemes_status = "";
  global.pageCount = 10;
  global.current_page_active = 1;
  global.previous_page = "";
  global.next_page = 2;
  global.start_record = 1;
  global.end_record = 10;
  global.totalrows = 10;
  axios.post.mockResolvedValue({
    status: 200,
    data: {
      totalSearchResults: 10,
      currentPage: 1,
      totalPages: 1,
      allScheme: "",
      activeScheme: "",
      inactiveScheme: "",
      schemes: [
        {
          subsidyMeasureTitle: "",
          scNumber: "",
          gaName: "",
          startDate: "",
          endDate: "",
          duration: "",
          budget: "",
        },
      ],
    },
  });
  request(app)
    .get("/measuresortroute", (req, res))
    .query({ page: "Scheme_Name" })
    .expect(200, done);
  //   expect(acd).toBe(200);
});

test("Unit testing for Subsidy Scheme Edit Test for GET call", (done) => {
  const req = mockRequest();
  const res = {};

  global.beis_url_searchscheme = "";

  global.Subsidy_Measure_Title_Global = "";
  global.Subsidy_Adhoc_Global = "";

  global.Search_Text_Global = "";
  global.current_page = "";
  global.frontend_totalRecordsPerPage = "";
  global.sorting_order_pass = "";

  global.subsidy_scheme_name_sorting_order = "asc";
  global.subsidy_scheme_name_arrow = "downdecending";
  global.subsidy_control_no_arrow = "upanddown";
  global.granting_authority_arrow = "upanddown";
  global.start_date_arrow = "upanddown";
  global.end_date_arrow = "upanddown";
  global.duration_arrow = "upanddown";
  global.budget_arrow = "upanddown";
  global.subsidy_control_no_sorting_order = "desc";

  global.awards_status = "Filter results by status";
  global.frontend_totalRecordsPerPage = 10;
  global.subsidy_scheme_name_arrow = "";
  global.subsidy_control_no_arrow = "";
  global.end_date_arrow = "";
  global.duration_arrow = "";
  global.budget_arrow = "";

  global.searchawards = {
    totalSearchResults: 10,
    currentPage: 1,
    totalPages: 1,
    schemes: [
      {
        subsidyMeasureTitle: "",
        scNumber: "",
        gaName: "",
        startDate: "",
        endDate: "",
        duration: "",
        budget: "",
      },
    ],
  };

  global.schemes_status = "";
  global.pageCount = 10;
  global.current_page_active = 1;
  global.previous_page = "";
  global.next_page = 2;
  global.start_record = 1;
  global.end_record = 10;
  global.totalrows = 10;
  axios.post.mockResolvedValue({
    status: 200,
    data: {
      totalSearchResults: 10,
      currentPage: 1,
      totalPages: 1,
      allScheme: "",
      activeScheme: "",
      inactiveScheme: "",
      schemes: [
        {
          subsidyMeasureTitle: "",
          scNumber: "",
          gaName: "",
          startDate: "",
          endDate: "",
          duration: "",
          budget: "",
        },
      ],
    },
  });
  request(app)
    .get("/measuresortroute", (req, res))
    .query({ page: "Control_Number" })
    .expect(200, done);
  //   expect(acd).toBe(200);
});

test("Unit testing for Subsidy Scheme Edit Test for GET call", (done) => {
  const req = mockRequest();
  const res = {};
  global.beis_url_searchscheme = "";
  global.beis_url_accessmanagement = "";

  global.Subsidy_Measure_Title_Global = "";
  global.Subsidy_Adhoc_Global = "";

  global.Search_Text_Global = "";
  global.current_page = "";
  global.frontend_totalRecordsPerPage = "";
  global.sorting_order_pass = "";

  global.subsidy_control_no_sorting_order = "";
  global.subsidy_scheme_name_arrow = "upacending";
  global.subsidy_control_no_arrow = "upanddown";
  global.granting_authority_arrow = "upanddown";
  global.start_date_arrow = "upanddown";
  global.end_date_arrow = "upanddown";
  global.duration_arrow = "upanddown";
  global.budget_arrow = "upanddown";
  global.subsidy_scheme_name_sorting_order = "asc";

  global.awards_status = "Filter results by status";
  global.frontend_totalRecordsPerPage = 10;
  global.subsidy_scheme_name_arrow = "";
  global.subsidy_control_no_arrow = "";
  global.end_date_arrow = "";
  global.duration_arrow = "";
  global.budget_arrow = "";

  global.searchawards = {
    activeScheme: "",
    allScheme: "",
    inactiveScheme: "",
    schemes: [
      {
        subsidyMeasureTitle: "",
        scNumber: "",
        gaName: "",
        startDate: "",
        endDate: "",
        duration: "",
        budget: "",
      },
    ],
  };

  global.schemes_status = "";
  global.pageCount = 10;
  global.current_page_active = 1;
  global.previous_page = "";
  global.next_page = 2;
  global.start_record = 1;
  global.end_record = 10;
  global.totalrows = 10;
  axios.post.mockResolvedValue({
    status: 200,
    data: {
      totalSearchResults: 10,
      currentPage: 1,
      totalPages: 1,
      allScheme: "",
      activeScheme: "",
      inactiveScheme: "",
      schemes: [
        {
          subsidyMeasureTitle: "",
          scNumber: "",
          gaName: "",
          startDate: "",
          endDate: "",
          duration: "",
          budget: "",
        },
      ],
    },
  });
  request(app)
    .get("/measuresortroute", (req, res))
    .query({ page: "Control_Number" })
    .expect(200, done);
  //   expect(acd).toBe(200);
});

test("Unit testing for Subsidy Scheme Edit Test for GET call", (done) => {
  const req = mockRequest();
  const res = {};

  global.beis_url_searchscheme = "";

  global.Subsidy_Measure_Title_Global = "";
  global.Subsidy_Adhoc_Global = "";

  global.Search_Text_Global = "";
  global.current_page = "";
  global.frontend_totalRecordsPerPage = "";
  global.sorting_order_pass = "";

  global.subsidy_scheme_name_sorting_order = "asc";
  global.subsidy_scheme_name_arrow = "downdecending";
  global.subsidy_control_no_arrow = "upanddown";
  global.granting_authority_arrow = "upanddown";
  global.start_date_arrow = "upanddown";
  global.end_date_arrow = "upanddown";
  global.duration_arrow = "upanddown";
  global.budget_arrow = "upanddown";
  global.granting_authority_sorting_order = "desc";

  global.awards_status = "Filter results by status";
  global.frontend_totalRecordsPerPage = 10;
  global.subsidy_scheme_name_arrow = "";
  global.subsidy_control_no_arrow = "";
  global.end_date_arrow = "";
  global.duration_arrow = "";
  global.budget_arrow = "";

  global.searchawards = {
    totalSearchResults: 10,
    currentPage: 1,
    totalPages: 1,
    schemes: [
      {
        subsidyMeasureTitle: "",
        scNumber: "",
        gaName: "",
        startDate: "",
        endDate: "",
        duration: "",
        budget: "",
      },
    ],
  };

  global.schemes_status = "";
  global.pageCount = 10;
  global.current_page_active = 1;
  global.previous_page = "";
  global.next_page = 2;
  global.start_record = 1;
  global.end_record = 10;
  global.totalrows = 10;
  axios.post.mockResolvedValue({
    status: 200,
    data: {
      totalSearchResults: 10,
      currentPage: 1,
      totalPages: 1,
      allScheme: "",
      activeScheme: "",
      inactiveScheme: "",
      schemes: [
        {
          subsidyMeasureTitle: "",
          scNumber: "",
          gaName: "",
          startDate: "",
          endDate: "",
          duration: "",
          budget: "",
        },
      ],
    },
  });
  request(app)
    .get("/measuresortroute", (req, res))
    .query({ page: "Granting_Authority" })
    .expect(200, done);
  //   expect(acd).toBe(200);
});

test("Unit testing for Subsidy Scheme Edit Test for GET call", (done) => {
  const req = mockRequest();
  const res = {};
  global.beis_url_searchscheme = "";
  global.beis_url_accessmanagement = "";

  global.Subsidy_Measure_Title_Global = "";
  global.Subsidy_Adhoc_Global = "";

  global.Search_Text_Global = "";
  global.current_page = "";
  global.frontend_totalRecordsPerPage = "";
  global.sorting_order_pass = "";

  global.granting_authority_sorting_order = "";
  global.subsidy_scheme_name_arrow = "upacending";
  global.subsidy_control_no_arrow = "upanddown";
  global.granting_authority_arrow = "upanddown";
  global.start_date_arrow = "upanddown";
  global.end_date_arrow = "upanddown";
  global.duration_arrow = "upanddown";
  global.budget_arrow = "upanddown";
  global.subsidy_scheme_name_sorting_order = "asc";

  global.awards_status = "Filter results by status";
  global.frontend_totalRecordsPerPage = 10;
  global.subsidy_scheme_name_arrow = "";
  global.subsidy_control_no_arrow = "";
  global.end_date_arrow = "";
  global.duration_arrow = "";
  global.budget_arrow = "";

  global.searchawards = {
    activeScheme: "",
    allScheme: "",
    inactiveScheme: "",
    schemes: [
      {
        subsidyMeasureTitle: "",
        scNumber: "",
        gaName: "",
        startDate: "",
        endDate: "",
        duration: "",
        budget: "",
      },
    ],
  };

  global.schemes_status = "";
  global.pageCount = 10;
  global.current_page_active = 1;
  global.previous_page = "";
  global.next_page = 2;
  global.start_record = 1;
  global.end_record = 10;
  global.totalrows = 10;
  axios.post.mockResolvedValue({
    status: 200,
    data: {
      totalSearchResults: 10,
      currentPage: 1,
      totalPages: 1,
      allScheme: "",
      activeScheme: "",
      inactiveScheme: "",
      schemes: [
        {
          subsidyMeasureTitle: "",
          scNumber: "",
          gaName: "",
          startDate: "",
          endDate: "",
          duration: "",
          budget: "",
        },
      ],
    },
  });
  request(app)
    .get("/measuresortroute", (req, res))
    .query({ page: "Granting_Authority" })
    .expect(200, done);
  //   expect(acd).toBe(200);
});

test("Unit testing for Subsidy Scheme Edit Test for GET call", (done) => {
  const req = mockRequest();
  const res = {};

  global.beis_url_searchscheme = "";

  global.Subsidy_Measure_Title_Global = "";
  global.Subsidy_Adhoc_Global = "";

  global.Search_Text_Global = "";
  global.current_page = "";
  global.frontend_totalRecordsPerPage = "";
  global.sorting_order_pass = "";

  global.start_date_sorting_order = "asc";
  global.subsidy_scheme_name_arrow = "downdecending";
  global.subsidy_control_no_arrow = "upanddown";
  global.granting_authority_arrow = "upanddown";
  global.start_date_arrow = "upanddown";
  global.end_date_arrow = "upanddown";
  global.duration_arrow = "upanddown";
  global.budget_arrow = "upanddown";
  global.subsidy_scheme_name_sorting_order = "desc";

  global.awards_status = "Filter results by status";
  global.frontend_totalRecordsPerPage = 10;
  global.subsidy_scheme_name_arrow = "";
  global.subsidy_control_no_arrow = "";
  global.end_date_arrow = "";
  global.duration_arrow = "";
  global.budget_arrow = "";

  global.searchawards = {
    totalSearchResults: 10,
    currentPage: 1,
    totalPages: 1,
    schemes: [
      {
        subsidyMeasureTitle: "",
        scNumber: "",
        gaName: "",
        startDate: "",
        endDate: "",
        duration: "",
        budget: "",
      },
    ],
  };

  global.schemes_status = "";
  global.pageCount = 10;
  global.current_page_active = 1;
  global.previous_page = "";
  global.next_page = 2;
  global.start_record = 1;
  global.end_record = 10;
  global.totalrows = 10;
  axios.post.mockResolvedValue({
    status: 200,
    data: {
      totalSearchResults: 10,
      currentPage: 1,
      totalPages: 1,
      allScheme: "",
      activeScheme: "",
      inactiveScheme: "",
      schemes: [
        {
          subsidyMeasureTitle: "",
          scNumber: "",
          gaName: "",
          startDate: "",
          endDate: "",
          duration: "",
          budget: "",
        },
      ],
    },
  });
  request(app)
    .get("/measuresortroute", (req, res))
    .query({ page: "Start_Date" })
    .expect(200, done);
  //   expect(acd).toBe(200);
});

test("Unit testing for Subsidy Scheme Edit Test for GET call", (done) => {
  const req = mockRequest();
  const res = {};
  global.beis_url_searchscheme = "";
  global.beis_url_accessmanagement = "";

  global.Subsidy_Measure_Title_Global = "";
  global.Subsidy_Adhoc_Global = "";

  global.Search_Text_Global = "";
  global.current_page = "";
  global.frontend_totalRecordsPerPage = "";
  global.sorting_order_pass = "";

  global.start_date_sorting_order = "";
  global.subsidy_scheme_name_arrow = "upacending";
  global.subsidy_control_no_arrow = "upanddown";
  global.granting_authority_arrow = "upanddown";
  global.start_date_arrow = "upanddown";
  global.end_date_arrow = "upanddown";
  global.duration_arrow = "upanddown";
  global.budget_arrow = "upanddown";
  global.subsidy_scheme_name_sorting_order = "asc";

  global.awards_status = "Filter results by status";
  global.frontend_totalRecordsPerPage = 10;
  global.subsidy_scheme_name_arrow = "";
  global.subsidy_control_no_arrow = "";
  global.end_date_arrow = "";
  global.duration_arrow = "";
  global.budget_arrow = "";

  global.searchawards = {
    activeScheme: "",
    allScheme: "",
    inactiveScheme: "",
    schemes: [
      {
        subsidyMeasureTitle: "",
        scNumber: "",
        gaName: "",
        startDate: "",
        endDate: "",
        duration: "",
        budget: "",
      },
    ],
  };

  global.schemes_status = "";
  global.pageCount = 10;
  global.current_page_active = 1;
  global.previous_page = "";
  global.next_page = 2;
  global.start_record = 1;
  global.end_record = 10;
  global.totalrows = 10;
  axios.post.mockResolvedValue({
    status: 200,
    data: {
      totalSearchResults: 10,
      currentPage: 1,
      totalPages: 1,
      allScheme: "",
      activeScheme: "",
      inactiveScheme: "",
      schemes: [
        {
          subsidyMeasureTitle: "",
          scNumber: "",
          gaName: "",
          startDate: "",
          endDate: "",
          duration: "",
          budget: "",
        },
      ],
    },
  });
  request(app)
    .get("/measuresortroute", (req, res))
    .query({ page: "Start_Date" })
    .expect(200, done);
  //   expect(acd).toBe(200);
});

test("Unit testing for Subsidy Scheme Edit Test for GET call", (done) => {
  const req = mockRequest();
  const res = {};

  global.beis_url_searchscheme = "";

  global.Subsidy_Measure_Title_Global = "";
  global.Subsidy_Adhoc_Global = "";

  global.Search_Text_Global = "";
  global.current_page = "";
  global.frontend_totalRecordsPerPage = "";
  global.sorting_order_pass = "";

  global.end_date_sorting_order = "asc";
  global.subsidy_scheme_name_arrow = "downdecending";
  global.subsidy_control_no_arrow = "upanddown";
  global.granting_authority_arrow = "upanddown";
  global.start_date_arrow = "upanddown";
  global.end_date_arrow = "upanddown";
  global.duration_arrow = "upanddown";
  global.budget_arrow = "upanddown";
  global.subsidy_scheme_name_sorting_order = "desc";

  global.awards_status = "Filter results by status";
  global.frontend_totalRecordsPerPage = 10;
  global.subsidy_scheme_name_arrow = "";
  global.subsidy_control_no_arrow = "";
  global.end_date_arrow = "";
  global.duration_arrow = "";
  global.budget_arrow = "";

  global.searchawards = {
    totalSearchResults: 10,
    currentPage: 1,
    totalPages: 1,
    schemes: [
      {
        subsidyMeasureTitle: "",
        scNumber: "",
        gaName: "",
        startDate: "",
        endDate: "",
        duration: "",
        budget: "",
      },
    ],
  };

  global.schemes_status = "";
  global.pageCount = 10;
  global.current_page_active = 1;
  global.previous_page = "";
  global.next_page = 2;
  global.start_record = 1;
  global.end_record = 10;
  global.totalrows = 10;
  axios.post.mockResolvedValue({
    status: 200,
    data: {
      totalSearchResults: 10,
      currentPage: 1,
      totalPages: 1,
      allScheme: "",
      activeScheme: "",
      inactiveScheme: "",
      schemes: [
        {
          subsidyMeasureTitle: "",
          scNumber: "",
          gaName: "",
          startDate: "",
          endDate: "",
          duration: "",
          budget: "",
        },
      ],
    },
  });
  request(app)
    .get("/measuresortroute", (req, res))
    .query({ page: "End_Date" })
    .expect(200, done);
  //   expect(acd).toBe(200);
});

test("Unit testing for Subsidy Scheme Edit Test for GET call", (done) => {
  const req = mockRequest();
  const res = {};
  global.beis_url_searchscheme = "";
  global.beis_url_accessmanagement = "";

  global.Subsidy_Measure_Title_Global = "";
  global.Subsidy_Adhoc_Global = "";

  global.Search_Text_Global = "";
  global.current_page = "";
  global.frontend_totalRecordsPerPage = "";
  global.sorting_order_pass = "";

  global.end_date_sorting_order = "";
  global.subsidy_scheme_name_arrow = "upacending";
  global.subsidy_control_no_arrow = "upanddown";
  global.granting_authority_arrow = "upanddown";
  global.start_date_arrow = "upanddown";
  global.end_date_arrow = "upanddown";
  global.duration_arrow = "upanddown";
  global.budget_arrow = "upanddown";
  global.subsidy_scheme_name_sorting_order = "asc";

  global.awards_status = "Filter results by status";
  global.frontend_totalRecordsPerPage = 10;
  global.subsidy_scheme_name_arrow = "";
  global.subsidy_control_no_arrow = "";
  global.end_date_arrow = "";
  global.duration_arrow = "";
  global.budget_arrow = "";

  global.searchawards = {
    activeScheme: "",
    allScheme: "",
    inactiveScheme: "",
    schemes: [
      {
        subsidyMeasureTitle: "",
        scNumber: "",
        gaName: "",
        startDate: "",
        endDate: "",
        duration: "",
        budget: "",
      },
    ],
  };

  global.schemes_status = "";
  global.pageCount = 10;
  global.current_page_active = 1;
  global.previous_page = "";
  global.next_page = 2;
  global.start_record = 1;
  global.end_record = 10;
  global.totalrows = 10;
  axios.post.mockResolvedValue({
    status: 200,
    data: {
      totalSearchResults: 10,
      currentPage: 1,
      totalPages: 1,
      allScheme: "",
      activeScheme: "",
      inactiveScheme: "",
      schemes: [
        {
          subsidyMeasureTitle: "",
          scNumber: "",
          gaName: "",
          startDate: "",
          endDate: "",
          duration: "",
          budget: "",
        },
      ],
    },
  });
  request(app)
    .get("/measuresortroute", (req, res))
    .query({ page: "End_Date" })
    .expect(200, done);
  //   expect(acd).toBe(200);
});

test("Unit testing for Subsidy Scheme Edit Test for GET call", (done) => {
  const req = mockRequest();
  const res = {};

  global.beis_url_searchscheme = "";

  global.Subsidy_Measure_Title_Global = "";
  global.Subsidy_Adhoc_Global = "";

  global.Search_Text_Global = "";
  global.current_page = "";
  global.frontend_totalRecordsPerPage = "";
  global.sorting_order_pass = "";

  global.duration_sorting_order = "asc";
  global.subsidy_scheme_name_arrow = "downdecending";
  global.subsidy_control_no_arrow = "upanddown";
  global.granting_authority_arrow = "upanddown";
  global.start_date_arrow = "upanddown";
  global.end_date_arrow = "upanddown";
  global.duration_arrow = "upanddown";
  global.budget_arrow = "upanddown";
  global.subsidy_scheme_name_sorting_order = "desc";

  global.awards_status = "Filter results by status";
  global.frontend_totalRecordsPerPage = 10;
  global.subsidy_scheme_name_arrow = "";
  global.subsidy_control_no_arrow = "";
  global.end_date_arrow = "";
  global.duration_arrow = "";
  global.budget_arrow = "";

  global.searchawards = {
    totalSearchResults: 10,
    currentPage: 1,
    totalPages: 1,
    schemes: [
      {
        subsidyMeasureTitle: "",
        scNumber: "",
        gaName: "",
        startDate: "",
        endDate: "",
        duration: "",
        budget: "",
      },
    ],
  };

  global.schemes_status = "";
  global.pageCount = 10;
  global.current_page_active = 1;
  global.previous_page = "";
  global.next_page = 2;
  global.start_record = 1;
  global.end_record = 10;
  global.totalrows = 10;
  axios.post.mockResolvedValue({
    status: 200,
    data: {
      totalSearchResults: 10,
      currentPage: 1,
      totalPages: 1,
      allScheme: "",
      activeScheme: "",
      inactiveScheme: "",
      schemes: [
        {
          subsidyMeasureTitle: "",
          scNumber: "",
          gaName: "",
          startDate: "",
          endDate: "",
          duration: "",
          budget: "",
        },
      ],
    },
  });
  request(app)
    .get("/measuresortroute", (req, res))
    .query({ page: "Duration" })
    .expect(200, done);
  //   expect(acd).toBe(200);
});

test("Unit testing for Subsidy Scheme Edit Test for GET call", (done) => {
  const req = mockRequest();
  const res = {};
  global.beis_url_searchscheme = "";
  global.beis_url_accessmanagement = "";

  global.Subsidy_Measure_Title_Global = "";
  global.Subsidy_Adhoc_Global = "";

  global.Search_Text_Global = "";
  global.current_page = "";
  global.frontend_totalRecordsPerPage = "";
  global.sorting_order_pass = "";

  global.duration_sorting_order = "";
  global.subsidy_scheme_name_arrow = "upacending";
  global.subsidy_control_no_arrow = "upanddown";
  global.granting_authority_arrow = "upanddown";
  global.start_date_arrow = "upanddown";
  global.end_date_arrow = "upanddown";
  global.duration_arrow = "upanddown";
  global.budget_arrow = "upanddown";
  global.subsidy_scheme_name_sorting_order = "asc";

  global.awards_status = "Filter results by status";
  global.frontend_totalRecordsPerPage = 10;
  global.subsidy_scheme_name_arrow = "";
  global.subsidy_control_no_arrow = "";
  global.end_date_arrow = "";
  global.duration_arrow = "";
  global.budget_arrow = "";

  global.searchawards = {
    activeScheme: "",
    allScheme: "",
    inactiveScheme: "",
    schemes: [
      {
        subsidyMeasureTitle: "",
        scNumber: "",
        gaName: "",
        startDate: "",
        endDate: "",
        duration: "",
        budget: "",
      },
    ],
  };

  global.schemes_status = "";
  global.pageCount = 10;
  global.current_page_active = 1;
  global.previous_page = "";
  global.next_page = 2;
  global.start_record = 1;
  global.end_record = 10;
  global.totalrows = 10;
  axios.post.mockResolvedValue({
    status: 200,
    data: {
      totalSearchResults: 10,
      currentPage: 1,
      totalPages: 1,
      allScheme: "",
      activeScheme: "",
      inactiveScheme: "",
      schemes: [
        {
          subsidyMeasureTitle: "",
          scNumber: "",
          gaName: "",
          startDate: "",
          endDate: "",
          duration: "",
          budget: "",
        },
      ],
    },
  });
  request(app)
    .get("/measuresortroute", (req, res))
    .query({ page: "Duration" })
    .expect(200, done);
  //   expect(acd).toBe(200);
});

test("Unit testing for Subsidy Scheme Edit Test for GET call", (done) => {
  const req = mockRequest();
  const res = {};

  global.beis_url_searchscheme = "";

  global.Subsidy_Measure_Title_Global = "";
  global.Subsidy_Adhoc_Global = "";

  global.Search_Text_Global = "";
  global.current_page = "";
  global.frontend_totalRecordsPerPage = "";
  global.sorting_order_pass = "";

  global.budget_sorting_order = "asc";
  global.subsidy_scheme_name_arrow = "downdecending";
  global.subsidy_control_no_arrow = "upanddown";
  global.granting_authority_arrow = "upanddown";
  global.start_date_arrow = "upanddown";
  global.end_date_arrow = "upanddown";
  global.duration_arrow = "upanddown";
  global.budget_arrow = "upanddown";
  global.subsidy_scheme_name_sorting_order = "desc";

  global.awards_status = "Filter results by status";
  global.frontend_totalRecordsPerPage = 10;
  global.subsidy_scheme_name_arrow = "";
  global.subsidy_control_no_arrow = "";
  global.end_date_arrow = "";
  global.duration_arrow = "";
  global.budget_arrow = "";

  global.searchawards = {
    totalSearchResults: 10,
    currentPage: 1,
    totalPages: 1,
    schemes: [
      {
        subsidyMeasureTitle: "",
        scNumber: "",
        gaName: "",
        startDate: "",
        endDate: "",
        duration: "",
        budget: "",
      },
    ],
  };

  global.schemes_status = "";
  global.pageCount = 10;
  global.current_page_active = 1;
  global.previous_page = "";
  global.next_page = 2;
  global.start_record = 1;
  global.end_record = 10;
  global.totalrows = 10;
  axios.post.mockResolvedValue({
    status: 200,
    data: {
      totalSearchResults: 10,
      currentPage: 1,
      totalPages: 1,
      allScheme: "",
      activeScheme: "",
      inactiveScheme: "",
      schemes: [
        {
          subsidyMeasureTitle: "",
          scNumber: "",
          gaName: "",
          startDate: "",
          endDate: "",
          duration: "",
          budget: "",
        },
      ],
    },
  });
  request(app)
    .get("/measuresortroute", (req, res))
    .query({ page: "Budget" })
    .expect(200, done);
  //   expect(acd).toBe(200);
});

test("Unit testing for Subsidy Scheme Edit Test for GET call", (done) => {
  const req = mockRequest();
  const res = {};
  global.beis_url_searchscheme = "";
  global.beis_url_accessmanagement = "";

  global.Subsidy_Measure_Title_Global = "";
  global.Subsidy_Adhoc_Global = "";

  global.Search_Text_Global = "";
  global.current_page = "";
  global.frontend_totalRecordsPerPage = "";
  global.sorting_order_pass = "";

  global.budget_sorting_order = "";
  global.subsidy_scheme_name_arrow = "upacending";
  global.subsidy_control_no_arrow = "upanddown";
  global.granting_authority_arrow = "upanddown";
  global.start_date_arrow = "upanddown";
  global.end_date_arrow = "upanddown";
  global.duration_arrow = "upanddown";
  global.budget_arrow = "upanddown";
  global.subsidy_scheme_name_sorting_order = "asc";

  global.awards_status = "Filter results by status";
  global.frontend_totalRecordsPerPage = 10;
  global.subsidy_scheme_name_arrow = "";
  global.subsidy_control_no_arrow = "";
  global.end_date_arrow = "";
  global.duration_arrow = "";
  global.budget_arrow = "";

  global.searchawards = {
    activeScheme: "",
    allScheme: "",
    inactiveScheme: "",
    schemes: [
      {
        subsidyMeasureTitle: "",
        scNumber: "",
        gaName: "",
        startDate: "",
        endDate: "",
        duration: "",
        budget: "",
      },
    ],
  };

  global.schemes_status = "";
  global.pageCount = 10;
  global.current_page_active = 1;
  global.previous_page = "";
  global.next_page = 2;
  global.start_record = 1;
  global.end_record = 10;
  global.totalrows = 10;
  axios.post.mockResolvedValue({
    status: 200,
    data: {
      totalSearchResults: 10,
      currentPage: 1,
      totalPages: 1,
      allScheme: "",
      activeScheme: "",
      inactiveScheme: "",
      schemes: [
        {
          subsidyMeasureTitle: "",
          scNumber: "",
          gaName: "",
          startDate: "",
          endDate: "",
          duration: "",
          budget: "",
        },
      ],
    },
  });
  request(app)
    .get("/measuresortroute", (req, res))
    .query({ page: "Budget" })
    .expect(200, done);
  //   expect(acd).toBe(200);
});
