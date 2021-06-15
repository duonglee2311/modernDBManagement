const homepage = require('../controller/homepage.controller');
const auth = require('../controller/auth.controller');
const restrict = require('../middlewares/user.mdw')


module.exports=function(app){
    app.get('/',restrict.user,homepage.homePage);
    app.use('/cart', require('../routes/cart.route'));
    app.use('/user',require('../routes/user.route'));
    app.use('/product',require('../routes/product.route'));
    app.use('/collection',require('../routes/collection.route'));
    app.use('/order',require('../routes/order.route'));
    app.get('/login',auth.login);
    app.get('/logout',auth.logout);
    app.post('/login',auth.handleLogin);
    app.get('/register',auth.sign_up);
    app.post('/register',auth.handleSign_up);
    app.get('/find_pass',auth.find_pass);
    // app.use('/order',require('../routes/order.route'));
    app.use('/seller',require('../routes/seller/seller.route'));
}