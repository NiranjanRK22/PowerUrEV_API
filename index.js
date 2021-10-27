var express = require('express');
var sql = require("mssql");
var dbcon=require('./db');
var bodyParser = require('body-parser');
//var https = require('https');
var tomailsend=require('./mail');
const mailsend = require('./mail');
var app = express();
//debugger;
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dbcon.initialize();
app.get('/test', function (req, res) {
    try{
        res.set('content-type','application/json');
        var request = new sql.Request();
        request.query('select userid,Firstname from PowerUrEV.dbo.userData', function (err, recordset) {
            if (err) console.log(err)

            // send records as a response
            res.status(200).send(recordset);
        
         
    });
}
    catch(err){
            
    }
});
app.post('/FormData', function (req, res) {
    
    res.set('content-type','application/json');   
    var request = new sql.Request();
    request.query("insert into PowerUrEV.dbo.userData values('"+req.body.nameValue+"','',"+req.body.numberValue+",'"+req.body.addressValue+"','"+req.body.emailValue+"')" , function (err, recordset) {
    try{
        res.status(200).send(recordset);
    }
    catch(err){
        res.end(JSON.stringify({
            status:false,
            message:err.message
        }));
    } 
    }); 
    //return;
});
app.post('/sendMail', async function (req, res) {
    res.set('content-type','application/json');
    var data=req.body;
    var result='';
    var text=(
        '<p>Team,<br>'+
        'Please note that a we got a new request contact below details '+
        '</p>'+
        '<table border="1" >'+
        '<th> Name</th>'+
        '<th>Mobile</th>'+
        '<tr>'+
        '<td>'+data.nameValue+'</td>'+
        '<td>'+data.numberValue+'</td>'+
        '<td>'+data.addressValue+'</td>'+
        '<td>'+data.emailValue+'</td>'+
        '</tr>'
    )
    var maildata={};
    var respdata={};
    maildata.text=text;
    //maildata.to=data.emailValue;
    maildata.to='info.powerurev@gmail.com';
    maildata.subject='User Details-'+data.numberValue;
    result=await tomailsend(maildata);
    console.log(result);
    //delay(1000);
    restext=('<p>Dear '+data.nameValue+',</p>'+
            'Thank you for submitting your details, we will contact you shortly<br><br>'+
            'Regards,<br>'+
            'Powerurev Team')
    respdata.text=restext;
    respdata.to=data.emailValue;
    respdata.subject='Powerurev Confirmation mail'
    result1=await tomailsend(respdata);
    console.log(result1);
    
    if(result!=''){
        res.status(200).send(JSON.stringify({
            message:'Success'
        }));
    }else{
        res.status(401).end(JSON.stringify({
            status:false,
            message:'Failed'
        }));
    }
});
var server = app.listen(5000, function () {
    console.log('Server is running..');
});