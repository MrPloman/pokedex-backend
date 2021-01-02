const mongoose = require("mongoose");

let Schema = mongoose.Schema;
let validRoles = {
    values: ["ADMIN_ROLE", "USER_ROLE"],
    message: "{VALUE} is not a valid role",
};

const trainerSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name Required"],
    },
    surname: {
        type: String,
        required: [true, "Name Required"],
    },
    email: {
        type: String,
        required: [true, "Email Required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password Required"],
    },
    img: { type: String, required: false },
    role: { type: String, default: "USER_ROLE", enum: validRoles },
    pokemons: [{ type: String, required: false }],
    google: { type: Boolean, required: false, default: false },
});

module.exports = trainerSchema;