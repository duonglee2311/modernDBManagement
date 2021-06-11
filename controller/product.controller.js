const Product = require('../model/product.model');
const Comment = require('../model/comment.model');
const {mutipleMongooseToObject,mongooseToObject} = require('../utils/mongoose');


module.exports={
    //GET: /product
    getProduct: async(req,res,next)=>{
        if(req.query.id === undefined){
            Product.find({})
                .then(products => {
                    res.render("vwProduct/Product_client",{products: mutipleMongooseToObject(products)})
                })
                .catch(next);
        }
        else{ //GET: /product?id=1
            Product.findById(req.query.id)
                .then(product => {
                    let product_detail = mongooseToObject(product);
                    Comment.find({idProduct: product_detail._id})
                        .then(comments => {
                            res.render("vwProduct/Product_detail",{
                                product: product_detail,
                                comments: mutipleMongooseToObject(comments)
                            });
                        })
                        .catch(next); 
                })
                .catch(next);
        }
    },
    //GET: /product/edit
    editProduct: async(req, res,next) => {
        // console.log(req.query.id);
        if(req.query.id === undefined){
            Product.find({seller: req.session.user.userID})
                .then(products =>{
                    res.render("vwProduct/Product_list_edit",{products: mutipleMongooseToObject(products)});
                })
                .catch(next);
        }
        else{//GET: /product/edit?id=1
            Product.findOne({_id: req.query.id})
                .then(product => {
                    res.render("vwProduct/Product_edit",{product: mongooseToObject(product)});
                })
                .catch(next);
        }
    },
    //[POST] /product/edit
    handleEditProduct: async(req, res,next)=>{
        Product.updateOne({_id: req.query.id},req.body)
            .then(() => res.redirect('/product/edit'))
            .catch(next);
    },
    //[GET]: /product/add 
    addProduct: async(req, res) => {
        res.render('vwProduct/Product_add');
    },
    //[POST]: /product/add
    handleAddProduct: async(req, res, next) => {
        const product = new Product(req.body);
        // console.log(product);
        product.save()
            .then(()=>res.redirect(`/product/edit`))
            .catch( error => {
                res.send(error);
            });
    },
    //[GET] /product/delete?id= 
    deleteProduct: async(req, res,next) =>{
        Product.deleteOne({_id: req.query.id})
            .then(() => res.redirect('back'))
            .catch(next);
    },
    //[POST] /product/:id/comment
    handleAddComment: async(req, res, next) =>{
        req.body.idProduct = req.params.id;
        req.body.idUser = req.session.user.userID;
        req.body.fullnameUser = req.session.user.fullname;
        req.body.avatarUser = req.session.user.avatar;
        const comment = new Comment(req.body);
        comment.save()
            .then(() => res.redirect('back'))
            .catch(next);
    },
}