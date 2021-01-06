const Trainer = require("../controllers/trainer.controller");
module.exports = (router) => {
    router.post("/trainer/register", Trainer.registerTrainer);
    router.post("/trainer/login", Trainer.login);
    router.post("/trainer/recovery", Trainer.recovery);
    router.get("/trainer/verify/:id", Trainer.verify);
    router.get("/trainer/me", Trainer.me);
};