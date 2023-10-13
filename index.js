const express = require("express");
const bodyParser = require("body-parser");
const { response } = require("express");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;
const db = require("./queries");
const cors = require("cors");

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//look for a GET request on the root / URL and return some JSON:
app.get("/", (request, response) => {

  response.json({ info: "issues logger" });
});

app.get("/issues", db.getIssues);
app.get("/issues/:id", db.getIssueById);
//new one below
app.get("/users/", db.getUsers);
app.post("/issues", db.createIssue);
app.put("/issues/:id", db.updateIssue);
app.delete("/issues/:id", db.deleteIssue);
app.post("/users", db.createUser);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
