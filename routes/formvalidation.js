
const express = require('express');
const router = express.Router();
const request = require("request");

router.get('/',(req, res) => {
  let isFileUploadEmpty =  false;
  let isNotCsvOrExcel = false;
  let isExcelFormat = false;
    res.render('bulkupload/bulkuploadsubsidy',{isFileUploadEmpty,isNotCsvOrExcel,isExcelFormat})
  });
  
  
  router.post('/',(req, res) => {
    
    let isFileUploadEmpty =  false;

    console.log("formvalidation")
    
    setTimeout(() => {
      if(req.files == null) {
      console.log("status:"+ req.files) ; }
  
    }, 3000);
  
    
    if (req.files == null) { 
      isFileUploadEmpty  = true
      console.log("file not uploaded" );
      res.render('bulkupload/bulkuploadsubsidy',{isFileUploadEmpty} );
    }  
  
    else {
     
  
    var file = req.files.file_upload_1; 
     var file_upload = file.name;
     var file_upload_name = file.name
     var filedata = file.data;
     var validationerrors =[]; 
    console.log("testfilename="+ file.name);
    console.log("file size:" + file.size); 
    console.log("content type:" + file.type);
    // var errorsvalidationpass =[];
    
  
    function toBuffer(ab) {
    var buffer = new Buffer.alloc(ab.byteLength);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
      buffer[i] = view[i];
    }
    return buffer;
   }
  
 
  var url = beis_url_publishing + '/uploadBulkAwards';
  
  var errorsvalidationpass;
  var req = request.post(url, function (err, resp, body) {
    if (err) {
      console.log('Application Programming Interface (API) is Down at this moment');
    } else {
      validationerrors = JSON.parse(body);
   
         console.log('URL: ' + body);
      console.log("type:"+ validationerrors);
      console.log(validationerrors.errorRows);
      errorsvalidationpass = JSON.stringify(validationerrors.validationErrorResult);
      console.log("type:"+ errorsvalidationpass);
      
    }
  });
  var form = req.form();
  
  form.append('file', toBuffer(file.data), {
    filename: file.name,
    contentType: file.type
  });
  
    let isFileUploadEmpty =  false;
    let isUploadSectionIsActive = true;
    let validCsvFormat = '.csv';
    let validExcelFormat = '.xlsx';
    let isCsvValid = false;
    let isExcelValid = false;
    let isNotCsvOrExcel = false;
    let isExcelFormat = false;
    let isCsvFormat = false;
    let isXlsxOk = false;
  
    if (!file_upload) { 
      isFileUploadEmpty  = true
      console.log("file not uploaded" );
     }
     else {
     isCsvValid = file_upload.includes(validCsvFormat)
     isExcelValid  =  file_upload.includes(validExcelFormat)
     }
  
     if (isCsvValid || isExcelValid ) { isNotCsvOrExcel = false; }
     else {  isNotCsvOrExcel = true }
  
     if (isExcelValid) {  isExcelFormat = true} 
     else { isExcelFormat = false}
  
     if (isCsvValid) {  isCsvFormat = true}
     else { isCsvFormat = false}
  
    console.log("isUploadSectionIsActive :" + isUploadSectionIsActive );
    
    setTimeout(() => {
      if (validationerrors.errorRows == 0 ) { isXlsxOk = true} 
      else { isXlsxOk = false }
      res.render('bulkupload/bulkuploadsubsidy',
      {file_upload_name,isUploadSectionIsActive,isFileUploadEmpty,isNotCsvOrExcel,isExcelFormat,isCsvFormat,isXlsxOk,validationerrors,errorsvalidationpass })
  }, 5000);
  
  } })
  

module.exports = router;



