const data = require("../../../data/notes.json");

exports.get = (req, res) => {
  res.render("postit", { data: data });
};

exports.getJson = (req, res) => {
  res.sendFile(__dirname + "/../../data/notes.json");
};