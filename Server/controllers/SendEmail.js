const nodemailer = require('nodemailer')


const sendEmail = (email, url, txt) =>{
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'kadrilounes2019@gmail.com', 
            pass: 'zsxijebenglbjgum', 
        },
    })

    console.log(transporter)
    var mailOptions = {
        from: "kadrilounes2019@gmail.com",
        to: email,
        subject: 'Email de verification diet',
        html: `
        <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
        <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the LG-DIET.</h2>
        <p>Congratulations! You're almost set to start using our dating platform.
            Just click the button below to validate your email address.
        </p>
        
        <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
    
        <p>If the button doesn't work for any reason, you can also click on the link below:</p>
    
        <div>${url}</div>
        </div>
    `
    }
  
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("err",error)
            return 1
        } else {
            return 0
        }
    })
}

module.exports = sendEmail
