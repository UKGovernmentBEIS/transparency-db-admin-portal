const express = require('express');
const router = express.Router();

function Export( errorsvalidationpass , errorRows ,file_upload_name ) {
    //The JSON string.
    var json1 = '[["Customer Id","Name","Country"],[1,"John Hammond","United States"],[2,"Mudassar Khan","India"],[3,"Suzanne Mathews","France"],[4,"Robert Schidner","Russia"]]';
    var headerjson = '[["Row","Column","Errors "]]';
    var headerpass = eval(headerjson );
    console.log("pdfgen err:" + json1)
    console.log("err rows:" + errorRows);

    // var valerr1 = JSON.parse(validationerrors);

    // validationerror = JSON.stringify(validationerrors);
    // console.log(JSON.stringify(validationerror));
    // console.log("total rows"+ validationerrors.validationErrorResult[0].columns);
    console.log("jsn pass :" + errorsvalidationpass);
    var errorsvalidationpassjson = JSON.parse(errorsvalidationpass);
    var extarct1 =  JSON.stringify(errorsvalidationpassjson[0]);
    console.log("parsejson="+ JSON.stringify(errorsvalidationpassjson[0]));
    var extarction1 = JSON.parse(extarct1 )
    console.log("extarct1 "+ extarction1.row); 
    console.log("accum="+  JSON.parse(JSON.stringify(errorsvalidationpassjson[0])).row );
    console.log("accum="+  JSON.parse(JSON.stringify(errorsvalidationpassjson[0])).columns );
    console.log("accum="+  JSON.parse(JSON.stringify(errorsvalidationpassjson[0])).errorMessages );
    // console.log(" ext1 =" + errorsvalidationpass[0].row);
    // console.log("pdfgen valerr : " + valerr);
    //Convert JSON string to JSON object.
    var customers = eval(json1);
     
    //Convert JSON to HTML Table.
    var table = document.createElement("TABLE");
    table.border = 1;
    table.Id = "tblCustomers"; 

    // add body

   
    //Get the count of columns.
    var columnCount = customers[0].length;

    //Add the header row.
    // var row = table.insertRow(-1);
    // for (var i = 0; i < columnCount; i++) {
    //     var headerCell =  document.createElement("TH");
    //     headerCell.innerHTML = customers[0][i];
    //     row.appendChild(headerCell);
    // }

    var row = table.insertRow(-1);
    for (var i = 0; i < columnCount; i++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = headerpass[0][i];
        row.appendChild(headerCell);
    }

    //Add the data rows.
    // for (var i = 1; i < customers.length; i++) {
    //     row = table.insertRow(-1);
    //     for (var j = 0; j < columnCount; j++) {
    //         var cell = row.insertCell(-1);
    //         cell.innerHTML = customers[i][j];
    //     }
    // }

    for (var i = 0; i < errorRows; i++) {
        row = table.insertRow(-1);
        
            var cell = row.insertCell(-1);
            cell.innerHTML = JSON.parse(JSON.stringify(errorsvalidationpassjson[i])).row ;
            var cell = row.insertCell(-1);
            cell.innerHTML = JSON.parse(JSON.stringify(errorsvalidationpassjson[i])).columns ;
            var cell = row.insertCell(-1);
            cell.innerHTML = JSON.parse(JSON.stringify(errorsvalidationpassjson[i])).errorMessages ;        
        
    }

    

    //Append the Table to the HTML DIV.
    var dvTable = document.getElementById("dvTable");
   
    // dvTable.appendChild(whatnext);
    //get current date and time

    function AddZero(num) {
        return (num >= 0 && num < 10) ? "0" + num : num + "";
    }
    


   
        var now = new Date();
        var strDateTime = [[AddZero(now.getDate()), 
            AddZero(now.getMonth() + 1), 
            now.getFullYear()].join("/"), 
            [AddZero(now.getHours()), 
            AddZero(now.getMinutes())].join(":"), 
            now.getHours() >= 12 ? "PM" : "AM"].join(" ");
           
 



    var img = new Image();
    img.src = './assets/images/govuk-logotype-crown.png';
    var path = "./assets/images/govuk-logotype-crown.png";

    


    dvTable.innerHTML =  "<path fill='currentColor' fill-rule='evenodd' d='M25 30.2c3.5 1.5 7.7-.2 9.1-3.7 1.5-3.6-.2-7.8-3.9-9.2-3.6-1.4-7.6.3-9.1 3.9-1.4 3.5.3 7.5 3.9 9zM9 39.5c3.6 1.5 7.8-.2 9.2-3.7 1.5-3.6-.2-7.8-3.9-9.1-3.6-1.5-7.6.2-9.1 3.8-1.4 3.5.3 7.5 3.8 9zM4.4 57.2c3.5 1.5 7.7-.2 9.1-3.8 1.5-3.6-.2-7.7-3.9-9.1-3.5-1.5-7.6.3-9.1 3.8-1.4 3.5.3 7.6 3.9 9.1zm38.3-21.4c3.5 1.5 7.7-.2 9.1-3.8 1.5-3.6-.2-7.7-3.9-9.1-3.6-1.5-7.6.3-9.1 3.8-1.3 3.6.4 7.7 3.9 9.1zm64.4-5.6c-3.6 1.5-7.8-.2-9.1-3.7-1.5-3.6.2-7.8 3.8-9.2 3.6-1.4 7.7.3 9.2 3.9 1.3 3.5-.4 7.5-3.9 9zm15.9 9.3c-3.6 1.5-7.7-.2-9.1-3.7-1.5-3.6.2-7.8 3.7-9.1 3.6-1.5 7.7.2 9.2 3.8 1.5 3.5-.3 7.5-3.8 9zm4.7 17.7c-3.6 1.5-7.8-.2-9.2-3.8-1.5-3.6.2-7.7 3.9-9.1 3.6-1.5 7.7.3 9.2 3.8 1.3 3.5-.4 7.6-3.9 9.1zM89.3 35.8c-3.6 1.5-7.8-.2-9.2-3.8-1.4-3.6.2-7.7 3.9-9.1 3.6-1.5 7.7.3 9.2 3.8 1.4 3.6-.3 7.7-3.9 9.1zM69.7 17.7l8.9 4.7V9.3l-8.9 2.8c-.2-.3-.5-.6-.9-.9L72.4 0H59.6l3.5 11.2c-.3.3-.6.5-.9.9l-8.8-2.8v13.1l8.8-4.7c.3.3.6.7.9.9l-5 15.4v.1c-.2.8-.4 1.6-.4 2.4 0 4.1 3.1 7.5 7 8.1h.2c.3 0 .7.1 1 .1.4 0 .7 0 1-.1h.2c4-.6 7.1-4.1 7.1-8.1 0-.8-.1-1.7-.4-2.4V34l-5.1-15.4c.4-.2.7-.6 1-.9zM66 92.8c16.9 0 32.8 1.1 47.1 3.2 4-16.9 8.9-26.7 14-33.5l-9.6-3.4c1 4.9 1.1 7.2 0 10.2-1.5-1.4-3-4.3-4.2-8.7L108.6 76c2.8-2 5-3.2 7.5-3.3-4.4 9.4-10 11.9-13.6 11.2-4.3-.8-6.3-4.6-5.6-7.9 1-4.7 5.7-5.9 8-.5 4.3-8.7-3-11.4-7.6-8.8 7.1-7.2 7.9-13.5 2.1-21.1-8 6.1-8.1 12.3-4.5 20.8-4.7-5.4-12.1-2.5-9.5 6.2 3.4-5.2 7.9-2 7.2 3.1-.6 4.3-6.4 7.8-13.5 7.2-10.3-.9-10.9-8-11.2-13.8 2.5-.5 7.1 1.8 11 7.3L80.2 60c-4.1 4.4-8 5.3-12.3 5.4 1.4-4.4 8-11.6 8-11.6H55.5s6.4 7.2 7.9 11.6c-4.2-.1-8-1-12.3-5.4l1.4 16.4c3.9-5.5 8.5-7.7 10.9-7.3-.3 5.8-.9 12.8-11.1 13.8-7.2.6-12.9-2.9-13.5-7.2-.7-5 3.8-8.3 7.1-3.1 2.7-8.7-4.6-11.6-9.4-6.2 3.7-8.5 3.6-14.7-4.6-20.8-5.8 7.6-5 13.9 2.2 21.1-4.7-2.6-11.9.1-7.7 8.8 2.3-5.5 7.1-4.2 8.1.5.7 3.3-1.3 7.1-5.7 7.9-3.5.7-9-1.8-13.5-11.2 2.5.1 4.7 1.3 7.5 3.3l-4.7-15.4c-1.2 4.4-2.7 7.2-4.3 8.7-1.1-3-.9-5.3 0-10.2l-9.5 3.4c5 6.9 9.9 16.7 14 33.5 14.8-2.1 30.8-3.2 47.7-3.2z'></path>" + " <br />" +
    "<h2>List of bulk upload errors: </h2> " + 
    "<br />" + " File name :" + file_upload_name + "<br />" + 
    "Uploaded on:" + strDateTime + "<br />" + 
    " Number of errors:" + errorRows + "<br />" + 
    "<h3> What happens next: </h3>" + "<br />"  + 
    " 1. Fix the errors listed below in the file you uploaded." + "<br />"  +
     "2. Try to upload the updated file again." + "<br />" +  "<br />";
    // dvTable.innerHRML = "    1. Fix the errors listed below in the file you uploaded."
    // dvTable.innerHTML = "    2. Try to upload the updated file again."
    dvTable.appendChild(table);


    //Convert Table to PDF.
    html2canvas(document.getElementById('dvTable'), {
        onrendered: function (canvas) {
            var data = canvas.toDataURL();
            var docDefinition = {
                content: [{
                    image: data,
                    width: 800
                }]
            };
            pdfMake.createPdf(docDefinition).download("BulkUploadErrors.pdf");

            //Remove the Table.
            dvTable.innerHTML = "";
        }
    });

    
}

module.exports = router;