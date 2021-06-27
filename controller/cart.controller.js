const cartModel = require('../model/cart.model')
module.exports={
    getCart: async(req,res)=>{
        /**
         * Lấy thông tin về user từ yêu cầu
         * thực hiện lấy thông tin cart và kiểm tra cart có tồn tại
         * Nếu chưa tồn tại thì trả về false để thông báo
         * Đã có thì hiển thị giỏ hàng
         */
        let userID = req.query.userID;
        let sumtotal = 0;
        let carts=await cartModel.showCart(userID);
        if(carts!=-1){
            for (i = 0; i< carts.length; i++){
                sumtotal = sumtotal + carts[i].subTotal;
            }            
        }else{
            carts=false;
        }
        res.render("vwCart/Cart",{cart: carts, sum: sumtotal});
    },
    addCart: async(req,res)=>{
        //Input: nhận vào thông tin sản phẩm: productID,name, image, price,quatity
        // - thông tin user: userID
        // Kiểm tra sản phẩm có tồn tại trong giỏ chưa
        //- chưa có thì thêm vào ds giỏ và thêm vào detail ds giỏ hàng
        //-Có rồi:
        // cập nhật số lượng tại detail ds giỏ hàng
        let userID=req.session.user.userID;
        let productID=req.query.productID;
        let image = req.query.image;
        let price = req.query.price;
        let sellerID = req.query.sellerID;
        let productName = req.query.productName;
        let sellerName = req.query.sellerName;
        let detail = {name:productName, image:image, price:price, sellerID:sellerID, quantity: 1, sellerName: sellerName};
        let isAddCart = await cartModel.addCart(userID, productID, detail);
        if(isAddCart == "OK"){
            res.redirect('back');
        }
        else{
            console.error("didn't complete add product into cart");
            res.redirect('back');
        }
    },
    updateCart: async(req,res)=>{
        /**
         * Nhận thông tin về sản phẩm trong giỏ hàng của user
         * kiểm tra yêu cầu cập nhật: tăng số lượng hay giảm
         * thực hiện cập nhật
         */
        let type = req.query.type;
        let userid = req.session.user.userID;
        productid = req.query.productID;
        let value;
        if(type === "minus"){
            value=-1;
        }else{
            value=1;
        }
        value=await cartModel.updateCart(userid,productid,value);
        res.redirect('back');
    }
}