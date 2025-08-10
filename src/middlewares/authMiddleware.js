class AuthMiddleware {
  static isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    }
    return res.status(401).json({ message: "unauthorized" });
  };

  static isOwner = (req, res, next) => {};

  static logout = (req, res, next) => {
    req.logout();
    next();
  };
}

module.exports = AuthMiddleware;
