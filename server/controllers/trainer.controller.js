const Trainer = require("../models/trainers/trainer.dao");

const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");
const { sendVerificationEmail } = require("./mailing.controller");
const { sendRecoveryEmail } = require("./mailing.controller");

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
        await sendVerificationEmail({
            body: { email: trainerData.email, id: trainerData._id },
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
        console.log(tr);
        if (err) res.json({ error: err });
        const getTrainer = await Trainer.findOne({ email: trainer.email });
        if (!getTrainer) {
            res
                .json({
                    result: {
                        status: 404,
                        message: "Account Not Registered",
                    },
                })
                .status(404);
        } else {
            if (getTrainer.active === false) {
                res
                    .status(403)
                    .json({ result: { message: "Email not verified", status: 403 } });
            } else {
                const comparePassword = await trainer.validatePassword(
                    trainer.password,
                    getTrainer.password
                );

                if (comparePassword === true) {
                    let token = await trainer.generateToken(getTrainer);
                    res
                        .json({
                            result: {
                                data: {
                                    email: getTrainer.email,
                                    name: getTrainer.name,
                                    token: token,
                                },
                                status: 200,
                                message: "Success",
                            },
                        })
                        .status(200);
                } else {
                    res
                        .json({ result: { status: 400, message: `Passwords don't match` } })
                        .status(400);
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
            await Trainer.findByIdAndUpdate({ _id: data.id }, {
                    $set: { active: true },
                },
                function(err, user) {
                    if (err) {
                        res.json({
                            status: 404,
                            title: "Account Not Found",
                            message: "This account doesn't exist, try it with another one which hasn't been already activated",
                        });
                    } else {
                        console.log(user);
                        if (user.active === true) {
                            res.json({
                                status: 200,
                                title: "This Account has been already activated",
                                message: "We can't activate this account because it was activated previously, so you can go to login and try to access",
                            });
                        } else {
                            res.json({
                                status: 200,
                                title: "Activated Successfully",
                                message: "Congratulations! Your account has been activated!",
                            });
                        }
                    }
                }
            );
        }
    });
};

exports.recovery = (req, res) => {
    Trainer.recovery(async(err, trainer) => {
        const { email } = req.body;
        const getTrainer = await Trainer.findOne({ email: email });
        console.log(getTrainer);
        if (!getTrainer) {
            res
                .json({
                    result: {
                        status: 404,
                        message: "Account Not Registered",
                    },
                })
                .status(404);
        } else {
            res
                .json({
                    result: {
                        status: 200,
                        message: "Recovery Password email sent successfully",
                    },
                })
                .status(200);
            await sendRecoveryEmail({
                body: { email: getTrainer.email, id: getTrainer._id },
            });
        }
    });
};