const users = require("../../data/login.json");

exports.register = (req, res) => {
    const newUser = {
        id: Date.now().toString(),
        username: req.body.username,
        password: req.body.password,
      };
    
      users.push(newUser);
      // Salva gli utenti nel tuo file login.json o database
    
      res.redirect("/myaccount");
};