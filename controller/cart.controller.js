const cartModel = require('../model/cart.model')
module.exports={
    getCart: async(req,res)=>{
        let userID = req.query.userID;
        let carts=await cartModel.showCart(userID);
        console.log('show: ',carts);
        let sumtotal = 0;
        for (i = 0; i< carts.length; i++){
            sumtotal = sumtotal + carts[i].subTotal;
        }
        console.log(sumtotal);
        res.render("vwCart/Cart",{cart: carts, sum: sumtotal});
        //res.send("OK")
    },
    addCart: async(req,res)=>{
        //Input: nhận vào thông tin sản phẩm: productID,name, image, price,quatity
        // - thông tin user: userID
        // Kiểm tra sản phẩm có tồn tại trong giỏ chưa
        //- chưa thì thêm vào ds giỏ và thêm vào detail ds giỏ hàng
        // -Có rồi:
        //- cập nhật số lượng tại detail ds giỏ hàng
       let userID=req.session.user.userID;
       let productID=req.query.productID;
       let image = req.query.image;
       let price = req.query.price;
       let sellerID = req.query.sellerID;
       let productName = req.query.productName;
       let quantity = 1;
        let detail = {name:productName, image:image, price:price, sellerID:sellerID, quantity: quantity};
        let result = await cartModel.addCart(userID, productID, detail);
        if(result === "OK"){
            // alert("Thêm sản phẩm vào giỏ hàng thành công!");
            console.log("them thanh cog");
            res.redirect('back');
        }
    //    let incrValue=req.params.value;
    //    let detail={ name: "sách1", image: "https://i.imgur.com/qqBRWD5.jpg", quantity: 2,price:23000, idSeller: 369, nameSeller: "duong" };
        //Thêm sản phẩm
        // console.log("thêm: ",await cartModel.addCart(userid,productid,detail));
        // console.log('show: ',await cartModel.showCart(userid));
        //done: trả về OK
        //fail: trả về 0
        // if fail
        // update sản phẩm
        // res.render("vwCart/Cart")
    },
    updateCart: async(req,res)=>{
        let type = req.query.type;
        let userid = req.session.user.userID;
        productid = req.query.productID;
        // console.log(type, userid, productid);
        if(type === "minus"){
            console.log("update: ", await cartModel.updateCart(userid,productid,-1));
            res.redirect('back');
        }else{
            console.log("update: ", await cartModel.updateCart(userid,productid,1));
            res.redirect('back');
        }
        
        
    },
    deleteCart: async(req,res)=>{
        res.send("OK");
    },

    

}