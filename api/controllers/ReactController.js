/**
 * ReactController
 *
 * @description :: Server-side logic for managing reacts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	redirectToTournaments: function(req, res) {
	  res.redirect('/tournaments');
  }
};

