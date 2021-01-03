const Trainer = require("../controllers/trainer.controller");
module.exports = (router) => {
    router.post("/trainer/register", Trainer.registerTrainer);
    router.post("/trainer/login", Trainer.login);
    router.get("/trainer/me", Trainer.me);
    router.get("/trainer/verify/:id", Trainer.verify);
};