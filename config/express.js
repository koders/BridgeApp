var passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy
  //Other strategies go here
  ;

var verifyHandler = function(token, tokenSecret, profile, done) {
  process.nextTick(function() {

    User.findOne({uid: profile.id}, function(err, user) {
      if (user) {
        console.log('user found:', user);
        return done(null, user);
      } else {

        var data = {
          provider: profile.provider,
          uid: profile.id,
          name: profile.displayName
        };

        if (profile.emails && profile.emails[0] && profile.emails[0].value) {
          data.email = profile.emails[0].value;
        }
        if (profile.name && profile.name.givenName) {
          data.firstname = profile.name.givenName;
        }
        if (profile.name && profile.name.familyName) {
          data.lastname = profile.name.familyName;
        }

        console.log('data', data);

        User.create(data, function(err, user) {
          console.log('done creating user');
          console.log('errors:', err);
          console.log('user:', user);
          return done(err, user);
        });
      }
    });
  });
};

passport.serializeUser(function(user, done) {
  done(null, user.uid);
});

passport.deserializeUser(function(uid, done) {
  User.findOne({uid: uid}, function(err, user) {
    console.log('err in deserialization:', err);
    console.log('user in deserialization:', user);
    done(err, user);
  });
});

var appId = process.env.FACEBOOK_APP_ID;
var appSecret = process.env.FACEBOOK_APP_SECRET;

var host = process.env.HOST;
var url = require('url');

module.exports.http = {

  customMiddleware: function(app) {

    passport.use(new FacebookStrategy({
      clientID: appId, // Use your Facebook App Id
      clientSecret: appSecret, // Use your Facebook App Secret
      callbackURL: url.resolve(host, 'auth/facebook/callback')
    }, verifyHandler));

    app.use(passport.initialize());
    app.use(passport.session());
  }
};
