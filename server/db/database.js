const mongoose = require("mongoose");
const { DB } = require("../config");
module.exports = () => {
    mongoose
        .connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("MongoDB Connected on", DB))
        .catch((err) => console.log(err));
};