const nodemailer = require('nodemailer');

const SendEmailUtility= async (EmailTo, EmailText, EmailSubject) => {

   
    let transporter = nodemailer.createTransport({
       // host: 'mail.teamrabbil.com',
       // port: 25,
       host: 'smtp.ethereal.email',
       port: 587,
        secure: false,
        auth: {
            // user: "info@teamrabbil.com",
            // pass: '~sR4[bhaC[Qs'
            user: 'zita.pfeffer@ethereal.email',
            pass: '5cDe3aDS9UEASAnSDk'
        },tls: {
            rejectUnauthorized: false
        },
    });

    let mailOptions = {
        from: 'Task Manager MERN <info@teamrabbil.com>',
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    };

    
   return  await transporter.sendMail(mailOptions)



}
module.exports=SendEmailUtility