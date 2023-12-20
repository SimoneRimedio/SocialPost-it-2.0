//index.js

const express = require("express");
const fs = require("fs");
const path = require("path");
const data = require("./data/notes.json");
const users = require("./data/login.json");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

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

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

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

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/postit", (req, res) => {
  res.render("postit", { data: data });
});

app.get("/json", function (req, res) {
  res.sendFile(__dirname + "./data/notes.json");
});

app.post("/scrivi", function (req, res) {
  let d = new Date();
  let minutes;
  let seconds;

  if (d.getMinutes() < 10) {
    minutes = "0" + d.getMinutes();
  } else {
    minutes = d.getMinutes();
  }

  if (d.getSeconds() < 10) {
    seconds = "0" + d.getSeconds();
  } else {
    seconds = d.getSeconds();
  }

  let date =
    d.getDate() +
    "/" +
    (d.getMonth() + 1) +
    "/" +
    d.getFullYear() +
    "\t\t" +
    (d.getHours() + 2) +
    ":" +
    minutes +
    ":" +
    seconds;

  let notes = {
    name: "@" + req.body.name,
    message: req.body.message,
    date: date,
  };

  data.push(notes);
  fs.writeFileSync("./data/notes.json", JSON.stringify(data));
  res.render("postit", { data: data });
});

app.get("/myaccount", (req, res) => {
  res.render("myaccount");
});

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  function(req, res) {
    // Regenerate the session to prevent session fixation attacks
    req.session.regenerate(function(err) {
      if (err) {
        console.error('Error regenerating session:', err);
      }
      res.redirect('/myaccount');
    });
  }
);

app.post("/register", (req, res) => {
  const newUser = {
    id: Date.now().toString(),
    username: req.body.username,
    password: req.body.password,
  };

  users.push(newUser);
  // Salva gli utenti nel tuo file login.json o database

  res.redirect("/myaccount");
});

app.listen(5000, () => {
  console.log("Server avviato sulla porta 5000");
});
