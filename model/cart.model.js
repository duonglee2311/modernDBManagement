const db = require('../utils/redis')



module.exports={
    // hàm trả về  kết quả query
    async addCart(){
        // return await db.hmset("employees", { HR: 1, MIS: " Clint", Accounting: "Mark" });//"Anthony"
        // return await db.set("employees", ["Anthony"," Clint","Mark" ]);
        // console.log("this is a test: __ ",arr);
    },
   async showCart(){
        // return await db.hgetall("employees");
        // return await db.get("employees");
    },
    async updateCart(){
        // return await db.hincrby("employees","HR",1);
    }
    
};