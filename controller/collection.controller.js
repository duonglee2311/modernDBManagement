// const collectionModel = require('../model/collection.model')
module.exports={
    //GET: /collection
    getCollection: async(req,res)=>{
        if(req.query.id != null){
            res.render("vwCollection/Collection_edit");
        }
        else{//GET: /collection?id=1
            res.render("vwCollection/Collection_index");
        }
        res.render("vwCollection/Collection_index");
    },
    //GET: /collection/create
    createCollection: async(req, res) =>{
        res.render("vwCollection/Collection_create");
    },
}