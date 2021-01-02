const Trainer = require("../models/trainers/trainer.dao");
const jwt = require("jsonwebtoken");
const config = require("../config/properties");

exports.registerTrainer = (req, res, next) => {
    let data = req.body;
    const trainer = new Trainer({
        name: data.name,
        surname: data.surname,
        email: data.email,
        password: data.password,
        role: data.role,
    });
    Trainer.create(trainer, async(err, trainerData) => {
        if (err) res.json({ error: err });

        res.json({
            message: "Trainer Created Successfully",
            trainer: trainerData,
        });
    });
};
exports.login = (req, res, next) => {
    let data = req.body;
    const trainer = new Trainer({
        email: data.email,
        password: data.password,
    });
    Trainer.login(async(err, tr) => {
        if (err) res.json({ error: err });
        const getTrainer = await Trainer.findOne({ email: data.email });
        if (!getTrainer) {
            res.json({
                error: {
                    status: 404,
                    message: "The email don't match with the password",
                },
            });
        } else {
            const comparePassword = await trainer.validatePassword(
                trainer.password,
                getTrainer.password
            );
            console.log(comparePassword);

            if (comparePassword === true) {
                let token = await trainer.generateToken(getTrainer);
                res.json({
                    email: getTrainer.email,
                    name: getTrainer.name,
                    token: token,
                });
            } else {
                res.json({ error: { status: 400, message: `Passwords don't match` } });
            }
        }
    });
};
exports.me = (req, res, next) => {
    Trainer.me(async(err, user) => {
        const accessToken = await req.headers["x-access-token"];
        if (err) res.json({ error: err });
        if (!accessToken) {
            res.json({ error: err });
        } else {
            const decoded = jwt.verify(accessToken, config.SECRET);
            const getTrainer = await Trainer.findById(decoded.id);
            if (!getTrainer) {
                return ErrorEvent;
            } else {
                res.json({ trainer: getTrainer });
            }
        }
    });
};