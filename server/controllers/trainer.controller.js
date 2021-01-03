const Trainer = require("../models/trainers/trainer.dao");

const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");
const { sendEmail } = require("./mailing.controller");

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
        await sendEmail({ body: { email: trainerData.email, id: trainerData._id } });
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
            console.log(getTrainer);
            if (getTrainer.active === false) {
                res.status(403).json({ message: "Email not verified", status: 403 });
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
        }
    });
};
exports.me = (req, res, next) => {
    Trainer.me(async(err, user) => {
        const accessToken = await req.headers["x-access-token"];
        if (!accessToken) {
            res.json({ error: err });
        } else {
            const decoded = await jwt.verify(accessToken, SECRET);
            console.log(decoded);

            const getTrainer = await Trainer.findById(decoded.id);
            if (!getTrainer) {
                res.json(err);
            } else {
                res.json({ trainer: getTrainer });
            }
        }
    });
};
exports.verify = (req, res) => {
    Trainer.verify(async(err, trainer) => {
        if (req) {
            let data = req.params;
            const newTrainer = await Trainer.findByIdAndUpdate({ _id: data.id }, {
                $set: { active: true },
            });
            if (newTrainer === undefined) {
                res.json({ status: 404, message: "User not found" });
            } else {
                res.json({ status: 200, message: "Activated Successfully" });
            }
        }
    });
};