const mongoose = require("mongoose");
const trainerSchema = require("./trainer.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../../config");

trainerSchema.statics = {
    create: async function(data, callback) {
        const trainer = new this(data);
        trainer.password = await trainerSchema.methods.encryptPassword(
            trainer.password
        );
        await trainer.save(callback);
    },
    login: async function(query, callback) {
        this.find(query, callback);
    },
    me: function(query, callback) {
        this.find(query, callback);
    },
    verify: function(query, callback) {
        this.find(query, callback);
    },
    recovery: function(query, callback) {
        this.find(query, callback);
    },
};
trainerSchema.methods.generateToken = async(trainer) => {
    const token = await jwt.sign({ id: trainer._id }, SECRET, {
        expiresIn: 60 * 60 * 24,
    });
    return token;
};
trainerSchema.methods.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};
trainerSchema.methods.validatePassword = async(password, realPassword) => {
    let des = bcrypt.compare(password, realPassword);
    return des;
};
const trainerModel = mongoose.model("trainer", trainerSchema);
module.exports = trainerModel;