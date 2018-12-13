var express = require('express');
var router = express.Router();

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

router.use(passport.initialize());

passport.use(new FacebookStrategy({
  clientID : '2098484963542096',
  clientSecret : 'ab6d7809c3496c580ad82cabfd5fd8b3',
  callbackURL: 'https://4e2e9d3b.ap.ngrok.io/authFacebook/done',
  profileFields: ['id', 'name', 'email', 'photos']
}, function(accessToken, refreshToken, profile, done){
  return done(null, profile);
}))

passport.serializeUser(function(profile,done){
  return done(null, profile);
})

passport.deserializeUser(function(profile,done){
  return done(null, profile);
})

router.get('/authFacebook', passport.authenticate('facebook'));
router.get('/authFacebook/done', 
passport.authenticate('facebook', {
  failureRedirect: '/'
}),function(req,res){
  return res.json(req.user);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
