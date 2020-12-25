const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");
let validRoles = {
    values: ["ADMIN_ROLE", "USER_ROLE"],
    message: "{VALUE} is not a valid role",
};
let Schema = mongoose.Schema;

let trainerSchema = new Schema({
    name: {
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
trainerSchema.plugin(uniqueValidator, { message: "{PATH} must be unique" });

module.exports = mongoose.model("Trainer", trainerSchema);