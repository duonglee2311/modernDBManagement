module.exports = {
    user: (req, res, next) => {
        console.log(req.session.user);
        if (req.session.user === false) {
            req.session.retUrl = req.originalUrl;
            return res.redirect('/login');
        }
        next();
    },
    isAdmin:(req, res, next) =>{
        if(String(req.session.user.username) != "admin"){
            throw Error('Access denied!');
        }
        next();
    },
    isSeller: (req, res, next) =>{
        if(String(req.session.user.username) != "nguoibanhang"){
            throw Error('Access denied!');
        }
        next();
    },

}