const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const { EMAIL, PASSWORD, MAIN_URL, FRONT_URL } = require("../config");
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: EMAIL,
        pass: PASSWORD,
    },
});
const handlebarOptions = {
    viewEngine: {
        extName: ".hbs",
        partialsDir: path.resolve(__dirname, "../../views"),
        defaultLayout: false,
    },
    viewPath: path.resolve(__dirname, "../../views"),
    extName: ".hbs",
};
transporter.use("compile", hbs(handlebarOptions));

exports.sendVerificationEmail = async(req, res) => {
    const mailOptions = {
        from: "PokedexApp",
        to: req.body.email,
        subject: "Confirmation Register",
        html: `
        <div style="margin: 0 auto; width: 50%; align-items: center;">
        <div style="margin: 0 auto; justify-content: center">
            <h1>Hi ${req.body.email}!</h1>
            <h3>Just one more step to confirm your account!</h3>
        </div>
        <div style="text-align: justify; font-size: 12px; margin: 0 auto">
            <p>
                If you've received this email it's just because
                <strong>you've completed our register proces successfully</strong>. This Email is just a
                <strong>confirmation to enable your access to "Pokedex App".</strong> If you haven't registered in our platform, please ignore this message and don't reply the email. Otherwise click the following button
                <strong>to confirm your account and go to login.</strong>
            </p>
        </div>
        <div style="margin: 0 auto; display: flex; align-items: center; justify-content: center">
            <button><a href="${FRONT_URL}/verify/${req.body.id}">Confirm Your Account</a></button>
        </div>
    </div>`,
    };

    await transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.send(500, error);
        } else {
            console.log("Email Confirmations sent");
            res.status(200).jsonp(req.body);
        }
    });
};
exports.sendRecoveryEmail = async(req, res) => {
    const mailOptions = {
        from: "PokedexApp",
        to: req.body.email,
        subject: "Recovery Password",
        html: `
        <div style="margin: 0 auto; width: 50%; align-items: center;">
        <div style="margin: 0 auto; justify-content: center">
            <h1>Hi ${req.body.email}!</h1>
            <h3>Are you trying to recovery your password?!</h3>
        </div>
        <div style="text-align: justify; font-size: 12px; margin: 0 auto">
            <p>
                If you've received this email it's just because
                <strong>you've requested to recovery your password</strong>. This Email is just a
                <strong>to reset your password and set a new one.</strong> If you haven't requested a change in your password, please ignore this message and don't reply the email. Otherwise click the following button
                <strong>and go to reset your password.</strong>
            </p>
        </div>
        <div style="margin: 0 auto; display: flex; align-items: center; justify-content: center">
            <button><a href="${FRONT_URL}/reset/${req.body.id}">Reset Your Password</a></button>
        </div>
    </div>`,
    };

    await transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.status(500).jsonp(error);
        } else {
            console.log("Email Recovery Password sent");
            res.status(200).jsonp(req.body);
        }
    });
};