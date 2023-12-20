const passport = require("passport");

exports.login = passport.authenticate('local', { 
  failureRedirect: '/login', 
  failureFlash: true 
}, (req, res) => {
  req.session.regenerate(function(err) {
    if (err) {
      console.error('Error regenerating session:', err);
    }
    res.redirect('/myaccount');
  });
});