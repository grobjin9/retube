/*
* Configure this module for your needs
* */
module.exports = {
  db: {
    url: "mongodb://localhost:27017/retube_chat"
  },
  session: {
    secret: "your favorite secret word"
  },
  facebook: {
    clientID: "your fb client id",
    clientSecret: "your fb client secret",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  port: 3000
};