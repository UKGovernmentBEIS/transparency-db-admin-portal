// ***********************************************************
// Automated Unit testing scripts for home page route
// ***********************************************************

const index = require("../app");
const request = require("supertest");
const express = require("express");
const app = express();
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));
app.use("/",index);

const mockRequest = (sessionData, body) => ({
    session: { data: sessionData },
    body,
  });


const res = {};

test("Unit testing for home page route - Test for POST call", done => {
    const req = mockRequest();
    
    const res = {};
    request(app)
      .post("/homepage",(req, res) )
      .expect(200, done);
  });


  test("Unit testing for home page route Test for GET call", done => {
     
    const req = mockRequest( );

    const res = {};
    request(app)
      .get("/homepage",(req, res) )
      .expect(200, done);
  });
