/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {

  // login action will render the login view
  login: function (req, res) {
    res.redirect('/');
  },

  // logout action will logout using Passport
  // and redirect
  logout: function(req, res) {
    req.logout();
    res.redirect('/');
  },

  // Here is were we specify our facebook strategy.
  // https://developers.facebook.com/docs/
  // https://developers.facebook.com/docs/reference/login/
  facebook: function(req, res) {
    passport.authenticate('facebook',
      { failureRedirect: '/', scope: ['email'] },
      function(err, user) {
        req.logIn(user, function(err) {
          if (err) {
            console.log(err);
            res.view('500');
            return;
          }
          res.redirect('/');
        });
      })(req, res);
  },

  check: function(req, res) {
    return res.ok(req.user);
  }

};

