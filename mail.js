var mailer=require('nodemailer');
let fromMail='noreply.powerurev@gmail.com';
//let toMail='info.powerurev@gmail.com';
let toMail='arksprasanth96@gmail.com';

//let mailSubject='Test Mail';
//let mailText='This is a testing mail';
const transporter=mailer.createTransport({
    service:'gmail',
    auth:{
        user:'noreply.powerurev@gmail.com',
        
        pass:'Music#1234'
    }
});
async function mailsend(maildata){
    let mailOptions={
        from:fromMail,
        to:maildata.to,
        subject:maildata.subject,
        html:maildata.text
    }
    
    transporter.sendMail(mailOptions,(error,response)=>{
    if(error){
        return error;
    }
    else{
        //console.log(response.accepted[0]);
        return response.accepted[0];
    }
});
};
module.exports=mailsend;