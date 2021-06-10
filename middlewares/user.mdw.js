module.exports = {
    user: (req, res, next) => {
        if (req.session.user === false) {
            req.session.retUrl = req.originalUrl;
            return res.redirect('/login');
        }
        next();
    },

}