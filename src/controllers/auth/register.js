const fs = require('fs');
const bcrypt = require('bcrypt');

exports.registerUser = (req, res) => {
  const { username, password } = req.body;

  // Hash della password prima di salvarla
  const hashedPassword = bcrypt.hashSync(password, 10); // 10 è il numero di salti

  // Crea un nuovo utente
  const newUser = {
    username: username,
    password: hashedPassword
  };

  // Leggi il file login.json
  const users = require("../../../data/login.json");

  // Controlla se l'utente esiste già
  const existingUser = users.find(user => user.username === newUser.username);
  if (existingUser) {
    return res.status(400).send('Utente già registrato.');
  }

  // Aggiungi il nuovo utente alla lista
  users.push(newUser);
  // Salva il nuovo utente nel file login.json
  fs.writeFileSync(__dirname+"/data/login.json", JSON.stringify(users));

  res.redirect('/myaccount');
};