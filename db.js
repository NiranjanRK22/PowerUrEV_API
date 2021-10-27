var sql = require("mssql");
var config = {
    server: 'DESKTOP-9TOIDLP',
    authentication:{
    type:'default',
    options:{      
    userName: 'PowerUV_sqluser',
    password: 'PowerUV_sqluser1$'
}
},
options:{
    encrypt:false,
    database:'PowerUrEV'
    
}
};

function initialize(){
    sql.connect(config, function (err) {
        //debugger;
          if (err) console.log(err);
    });
};
module.exports={initialize}