const homepage = require('../controller/homepage.controller');
const auth = require('../controller/auth.controller');
const restrict = require('../middlewares/user.mdw')


module.exports=function(app){
    app.get('/',restrict.user,homepage.homePage);
    app.use('/admin', restrict.isAdmin, require('../routes/admin/admin.route'));
    app.use('/user', restrict.user, require('../routes/user/user.route'));
    app.use('/cart',restrict.user, require('../routes/user/cart.route'));
    app.use('/seller/order',restrict.isSeller,require('../routes/seller/order.route'));
    app.use('/seller/product',restrict.isSeller, require('../routes/seller/product.route'));
    app.use('/seller',restrict.isSeller, require('../routes/seller/seller.route'));
    app.use('/collection',restrict.isSeller,require('../routes/seller/collection.route'));
    app.get('/login',auth.login);
    app.get('/logout',auth.logout);
    app.post('/login',auth.handleLogin);
    app.get('/register',auth.sign_up);
    app.post('/register',auth.handleSign_up);
    app.get('/find_pass',auth.find_pass);
    app.use('/product',restrict.user, require('../routes/user/product.route'));
    app.use('/order',restrict.user, require('../routes/user/order.route'));
    
    // app.use('/order',require('../routes/order.route'));
    
}