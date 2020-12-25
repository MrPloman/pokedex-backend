const mongoose = require("mongoose");
const dbURL = require("../config/properties").DB;
module.exports = () => {
    mongoose
        .connect(dbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("MongoDB Connected on", dbURL))
        .catch((err) => console.log(err));
};