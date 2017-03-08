function checkAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).json("unauthorized request");
  }

  next();
}

module.exports = {
  checkAuth
};