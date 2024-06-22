
const authenticate = (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.status(401).send('Unauthorized');
    }
};

const authAdmin = (req, res, next) => {
    let userData = req.session.user;
    if(userData && userData.role === "ADMIN")
        next();
    else
        res.status(401).send('Unauthorized');
};

module.exports = {authenticate, authAdmin};