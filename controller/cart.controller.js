const cartModel = require('../model/cart.model')
module.exports={
    getCart: async(req,res)=>{
        let cart=await cartModel.showCart('123');
        console.log('show: ',cart);
        res.render("vwCart/Cart",{cart: cart});
        //res.send("OK")
    },
    addCart: async(req,res)=>{
        //Input: nhận vào thông tin sản phẩm: productID,name, image, price,quatity
        // - thông tin user: userID
        // Kiểm tra sản phẩm có tồn tại trong giỏ chưa
        //- chưa thì thêm vào ds giỏ và thêm vào detail ds giỏ hàng
        // -Có rồi:
        //- cập nhật số lượng tại detail ds giỏ hàng
       let userid=123;
       let productid=4563;
       let incrValue=req.params.value;
       let detail={ name: "sách1", image: "https://i.imgur.com/qqBRWD5.jpg", quantity: 2,price:23000, idSeller: 369, nameSeller: "duong" };
        //Thêm sản phẩm
        console.log("thêm: ",await cartModel.addCart(userid,productid,detail));
        console.log('show: ',await cartModel.showCart(userid));
        //done: trả về OK
        //fail: trả về 0
        // if fail
        // update sản phẩm
        res.render("vwCart/Cart")
    },
    updateCart: async(req,res)=>{
        console.log("update: ", await cartModel.updateCart(userid,productid,1));
        res.send("OK")
    },
    deleteCart: async(req,res)=>{
        res.send("OK");
    },

    

}