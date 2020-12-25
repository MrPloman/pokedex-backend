const express = require("express");

const bcrypt = require("bcrypt");
const app = express();
const Trainer = require("../models/trainer.model");

app.get("/trainer/:id", (req, res) => {
    res.send(req.params);
});

app.post("/trainer", (req, res) => {
    let data = req.body;
    if (data) {
        let trainer = new Trainer({
            name: data.name,
            email: data.email,
            password: bcrypt.hashSync(data.password, 10),
            role: data.role,
        });
        trainer.save((err, trainerDB) => {
            err
                ?
                res.status(400).json({
                    status: 400,
                    success: false,
                    error: err,
                }) :
                res.status(200).json({
                    status: 200,
                    success: true,
                    trainer: trainerDB,
                });
        });
    }
});
module.exports = app;