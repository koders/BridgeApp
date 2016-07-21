/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  changeLanguage: function (req, res) {
    var userId = req.param('id');
    var language = req.body.language;
    User.update({uid:userId}, {language}).exec(function(err, updated) {
      if(err) {
        return res.serverError();
      }
      return res.ok();
    });
  },
};

