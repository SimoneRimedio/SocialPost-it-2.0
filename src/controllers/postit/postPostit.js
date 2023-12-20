const fs = require("fs");
const data = require("../../../data/notes.json");

exports.post = (req, res) => {
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
};