module.exports = {
    user: (req, res, next) => {
        if (req.session.user === false) {
            req.session.retUrl = req.originalUrl;
            return res.redirect('/login');
        }
        next();
    },
    isAdmin:(req, res, next) =>{
        if(String(req.session.user.permission) != "admin"){
            throw Error('Access denied!');
        }
        next();
    },
    isSeller: (req, res, next) =>{
        if(String(req.session.user.permission) != "seller"){
            throw Error('Access denied!');
        }
        next();
    },

}