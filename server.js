const express = require('express');
const bodyParser = require('body-parser');
const router = require("./router/router");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(router);

app.listen(port, () => console.log(`server is running at http://localhost:${port}/`));