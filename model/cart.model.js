const db = require('../utils/redis')



module.exports={
    // hàm trả về  kết quả query
    async addCart(userid,productid,detailProduct){
        const cartKey='Cart:'+userid;
        console.log(cartKey);
        const cartKeyProduct='Cart:'+userid+':'+productid;
        console.log(cartKeyProduct);
        if(await db.sadd(cartKey, productid)=="1"){
            console.log('add');
            return await db.hmset(cartKeyProduct,detailProduct);
        }
        else {
            console.log('update di');
            return 0;
        } 
    },
    async showCart(userid){
        //Lấy ra ds sản phẩm trong cart
        const cartKey='Cart:'+userid;
        let listProduct=await db.smembers(cartKey);
        console.log("ds san pham:",listProduct);
        // nếu không giỏ hàng không có sản phẩm (không tồn tại) => return -1
        if(length(listProduct)==0)
            return -1;
        // lấy thông tin cụ thể của từng sp trong cart
        let list=[]
        for (const element of listProduct) {
            let cartKeyProduct='Cart:'+userid+':'+element;
            const item=await db.hgetall(cartKeyProduct);
            // console.log(item);
            list.push(item); 
        };
        console.log("ds san pham detail:" ,list);
        //trả về danh sách cart đầy đủ
        return list;
        },
        async updateCart(userid, productid,value){
            let cartKeyProduct='Cart:'+userid+':'+productid;
            console.log("voo roi")
            //value là giá trị số lượng thay đổi
            //giảm với value <0
            //- nếu tăng nếu value>0
            let isEmptyQuantity= await db.hget(cartKeyProduct,"quantity");
            console.log(isEmptyQuantity);
            if(isEmptyQuantity<=1){
                // xoá sản phẩm: trả về 1: thành công; 0: không thành công
                return this.deleteCart(userid,productid);
                
            }
            else{
                return await db.hincrby(cartKeyProduct,'quantity',value);
            }
        },
    async deleteCart (userid,productid){
        let cartKey='Cart:'+userid;
        let cartKeyProduct='Cart:'+userid+':'+productid;
        return  await db.srem(cartKey,productid) &&  await db.del(cartKeyProduct);
    },
    
};