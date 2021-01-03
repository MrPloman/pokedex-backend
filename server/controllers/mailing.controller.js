const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const { EMAIL, PASSWORD, MAIN_URL, PORT } = require("../config");
exports.sendEmail = async(req, res) => {
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
    const mailOptions = {
        from: "PokedexApp",
        to: req.body.email,
        subject: "Confirmation Register",

        html: `<p>Click <a href="${MAIN_URL}/api/trainer/verify/${req.body.id}">here</a> to reset your password</p>'`,
    };

    await transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.send(500, error);
        } else {
            console.log("Email sent");
            res.status(200).jsonp(req.body);
        }
    });
};