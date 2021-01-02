//IMPORTS
require("./config/config");
const trainerRoutes = require("./routes/trainer.routes");
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db/database");
const router = express.Router();
const cors = require("cors");

//DECLARATIONS
const app = express();
const port = process.env.PORT;

//INIT
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//DB

db();

//ROUTES
app.use(router);
trainerRoutes(router);

//RUNNING
app.listen(port, () => console.log(`listening on http://localhost:${port}`));