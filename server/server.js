//IMPORTS
const { PORT, MAIN_URL } = require("./config");
const mailingRoutes = require("./routes/mail.routes");
const trainerRoutes = require("./routes/trainer.routes");
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db/database");
const router = express.Router();
const cors = require("cors");

//DECLARATIONS
const app = express();

//INIT
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//DB

db();

//ROUTES
app.use("/api/", router);
trainerRoutes(router);
mailingRoutes(router);

//RUNNING
app.listen(PORT, () => {
    console.log(`listening on ${MAIN_URL}`);
});