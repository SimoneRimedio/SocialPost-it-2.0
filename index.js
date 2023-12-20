const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const loginController = require("./src/controllers/auth/login");
const registerController = require("./src/controllers/auth/register");
const postPostitController = require("./src/controllers/postit/postPostit");
const getPostitController = require("./src/controllers/postit/getPostit");

const app = express();

// Configurazione di Passport
passport.use(
  new LocalStrategy(function (username, password, done) {
    const user = users.find((u) => u.username === username);
    if (!user) {
      return done(null, false, { message: "Utente non trovato." });
    }
    if (user.password !== password) {
      return done(null, false, { message: "Password errata." });
    }
    return done(null, user);
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  const user = users.find((u) => u.id === id);
  done(null, user);
});

// Sessione e inizializzazione di Passport
app.use(
  session({
    secret: "il_tuo_segreto",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

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
app.post("/login", loginController.login);
app.post("/register", registerController.register);

app.listen(5000, () => {
  console.log("Server avviato sulla porta 5000");
});
