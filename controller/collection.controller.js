const Product = require('../model/product.model');
const Collection = require('../model/collection.model');
const {mutipleMongooseToObject,mongooseToObject} = require('../utils/mongoose');

module.exports={
    //GET: /collection
    getCollection: async(req,res,next)=>{
        if(req.query.id === undefined){
            Collection.find({seller: req.session.user.userID})
                .then(collections =>{
                    res.render("vwCollection/Collection_index",{
                        collections: mutipleMongooseToObject(collections),
                        layout: 'seller',
                    });
                })
                .catch(next);
        }
        else{//GET: /collection?id=1
            Collection.findById(req.query.id)
                .then(collection =>{
                    colectionDetail = mongooseToObject(collection);
                    // console.log(colectionDetail.listProduct);
                    var productsInCollection = colectionDetail.listProduct
                    Product.find({seller:req.session.user.userID})
                        .then(products =>{
                            productList = mutipleMongooseToObject(products);
                            res.render("vwCollection/Collection_edit",{
                                collection: colectionDetail,products: productList,productsInCollection: productsInCollection,
                                layout: 'seller',
                            });
                        })
                        .catch(next);
                })
                .catch(next); 
        }
    },
    //GET: /collection/create
    createCollection: async(req, res) =>{

        res.render("vwCollection/Collection_create",{
            layout: 'seller',
        });
    },
    //[POST]: /collection/create 
    handleCreateCollection: async(req, res, next) =>{
        req.body.listProduct = null;
        const collection = new Collection(req.body);
        collection.save() 
            .then(() => res.redirect(`/collection`))
            .catch(next);
    },
    //[GET] /collection/AddProduct?
    addProductToCollection: async(req, res, next) =>{
        var collectionID=req.query.id_collection;
        var productID = req.query.id_product;
        var nameProduct = req.query.nameProduct;
        var imgThumb = req.query.img_thumb;
        var price = req.query.price;
        var productAdd = 
                {
                    _id: productID,
                    nameProduct: nameProduct,
                    img_thumb: imgThumb,
                    price: price
                };
        Collection.findById(collectionID)
            .then((coll)=>{
                collect = mongooseToObject(coll);
                // console.log(collect);
                var temp = collect.listProduct;
                console.log(temp);
                var temp1=[];
                temp1.push(productAdd);
                if(temp != undefined){
                    temp.push(temp1[0]);
                }else{
                    temp = temp1;
                }
                collect.listProduct = temp;
                Collection.updateOne({_id: collectionID}, collect)
                    .then(() => res.redirect('back'))
                    .catch(next);
            })
    },
    //[GET]  /collection/delProduct?
    delProductFromCollection: async(req, res, next)=>{
        var collectionID=req.query.id_collection;
        var productID = req.query.id_product;
        var nameProduct = req.query.nameProduct;
        var imgThumb = req.query.img_thumb;
        var price = req.query.price;
        var productDel = {
            _id: productID,
            nameProduct: nameProduct,
            img_thumb: imgThumb,
            price: price
        };
        Collection.findById(collectionID)
            .then((collection)=>{
                var temp = collection.listProduct;
                let pos = temp.indexOf(productDel);
                temp.splice(pos, 1);
                collection.listProduct = temp;
                Collection.updateOne({_id: collectionID}, collection)
                    .then(() => res.redirect('back'))
                    .catch(next);
            })
            .catch(next);
    },
    //[GET]: /collection/deleteCollection?id=
    deleteCollection: async(req, res, next)=>{
        Collection.deleteOne({_id: req.query.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }
    
}