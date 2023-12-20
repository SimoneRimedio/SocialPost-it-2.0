const fs = require("fs");
const bcrypt = require("bcrypt");

exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  // Leggi il file login.json
  const users = require("../../../data/login.json");

  // Trova l'utente nel file
  const user = users.find((u) => u.username === username);

  if (!user) {
    return { success: false, message: "Utente non trovato." };
  }

  // Confronta la password hashata
  if (bcrypt.compare(password, user.password)) {
    return { success: true, user: user };
  } else {
    return { success: false, message: "Password errata." };
  }
};
