var express = require('express'),
  passport = require('passport'),
  bodyParser = require('body-parser'),
  LdapStrategy = require('passport-ldapauth');

var opts = {
  server: {
    url: 'ldap://ldap.forumsys.com:389',             // Host + port
    bindDn: 'cn=read-only-admin,dc=example,dc=com',  // user DN
    bindCredentials: 'password',                     // Password
    searchBase: 'dc=example,dc=com',                 // Base DN
    searchFilter: '(uid={{username}})'
    // protocal: LDAP v3
  }
};

var app = express();

passport.use(new LdapStrategy(opts, function(user, done){
  done(null, user);
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());

app.post('/login', passport.authenticate('ldapauth', {session: false}), function(req, res) {
  res.send({status: 'Hello ' + req.user.uid});
});

app.listen(8998);
