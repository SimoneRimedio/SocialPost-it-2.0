//index.js
//qui viene importata la libreria Express.js e assegnata alla costante express.
const express = require("express");
//qui viene importata la libreria fs per la gestione del file system.
const fs = require("fs");
//qui viene importata la libreria ejs per la gestione dei template. const ejs = require('ejs')
//qui viene importata la libreria path per la gestione dei percorsi dei file.
const path = require("path");
//qui viene importato il file notes.json contenente le note, che viene assegnato alla variabile
//data.qui viene importato il file notes.json contenente le note, che viene assegnato alla variabile data.
let data = require("./data/notes.json");
//qui viene creato un'istanza di Express.js, che viene assegnata alla variabile app.
let app = express();

//qui viene usato body-parser per la gestione del corpo delle richieste della pagina.
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
//qui viene specificata la directory public come directory statica, da
//cui vengono serviti i file statici come immagini, fogli di stile e file JavaScript.
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
//qui viene specificata la directory views come cartella dei template, da cui vengono prelevati i file .ejs.
app.set("views", path.join(__dirname, "views"));
//richiesta della pagina 'home'
app.get("/", (req, res) => {
  res.render("home");
});
//richiesta della pagina 'postit' con l'aggiunta dei dati JSON app.get('/postit', (req, res) => {
res.render("postit", { data: data });

//richiesta del file JSON
app.get("/json", function (req, res) {
  res.sendFile(__dirname + "./data/notes.json");
});
//gestione della richiesta per scrivere un nuovo post-it app.post('/scrivi', function(req, res) {
console.log(req.body.name);
console.log(req.body.message);
//creazione data----------------------------------------------------------
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
//------------------------------------------------------------------------
//creazione dell'oggetto JSON
let notes = {
  name: "@" + req.body.name,
  message: req.body.message,
  date: date,
};
//inserimento dell'oggetto dentro al file e JSON e caricamento della nuova pagina
data.push(notes);
fs.writeFileSync("./data/notes.json", JSON.stringify(data));
res.render("postit", { data: data });

app.listen(5000); //Server avviato sulla porta 5000
