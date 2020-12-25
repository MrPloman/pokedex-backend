//IMPORTS
require("./config/config");
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db/database");

//DECLARATIONS
const app = express();
const port = process.env.PORT;

//INIT
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB

db();

//ROUTES
app.use(require("./routes/trainer.routes"));

//RUNNING
app.listen(port, () => console.log(`listening on http://localhost:${port}`));