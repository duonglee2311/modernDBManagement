module.exports = function(app) {
    app.use(async function(req, res, next) {
        if(typeof(req.session.user) === 'undefined'){
            req.session.user = false;
        }
        res.locals.isUser = req.session.user;
        // console.log(res.locals.isUser);
        next();
    })
}