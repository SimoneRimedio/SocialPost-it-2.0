const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const user = require("./data/login.json");

const loginController = require("./src/controllers/auth/login");
const registerController = require("./src/controllers/auth/register");
const postPostitController = require("./src/controllers/postit/postPostit");
const getPostitController = require("./src/controllers/postit/getPostit");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/myaccount", (req, res) => {
  res.render("myaccount");
});

app.get("/postit", getPostitController.get);
app.get("/json", getPostitController.getJson);
app.post("/scrivi", postPostitController.post);
app.post("/register", registerController.registerUser);

app.post("/login", (req, res) => {
  const result = loginController.loginUser(req, res);

  if (result.success) {
    res.render("myaccount", { user: result.user });
  } else {
    res.status(401).send(result.message);
  }
});

app.listen(5000, () => {
  console.log("Server avviato sulla porta 5000");
});
