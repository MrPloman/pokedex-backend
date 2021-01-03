const Mailing = require("../controllers/mailing.controller");
module.exports = (router) => {
    router.post("/email", Mailing.sendEmail);
};