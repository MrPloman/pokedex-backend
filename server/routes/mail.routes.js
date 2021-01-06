const Mailing = require("../controllers/mailing.controller");
module.exports = (router) => {
    router.post("/email/confirmation", Mailing.sendVerificationEmail);
    router.post("/email/recovery", Mailing.sendRecoveryEmail);
};