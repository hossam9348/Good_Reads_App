
const isAdmin = (req, res, next) => {
    const role = req.user.role ;

    if (!role==="admin") {
        return res.status(403).send("this route is not avilable for your role");
    }
    return next();
};

module.exports = isAdmin;