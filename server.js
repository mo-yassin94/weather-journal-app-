// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");

/* Dependencies */
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// get route and callback function to complete get `/all`
app.get("/all", getInfo);

// function ..
function getInfo(req, res) {
  res.send(projectData);
}

// get route and callback function to complete post `/add`
app.post("/add", addInfo);
//function
function addInfo(req, res) {
  projectData["temp"] = req.body.temp;
  projectData["date"] = req.body.date;
  projectData["content"] = req.body.content;
  res.send(projectData);
  res.end();
}

// function to test server ..
const port = 9090;
app.listen(port, () => {
  console.log(`server is listening on port: ${port}`);
});
