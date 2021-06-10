const redis =require("redis");
const util =require('util');


const client = redis.createClient();
// const pool_query = util.promisify(client);
client.on("error",function(error){
    console.log('have error');
});
client.on("connect",function(error){
    console.log('connecting');
});

// client.set("key", "value", redis.print);
// client.get("key", redis.print);
// var a=util.promisify(client.get).bind(client);
//client.hmset("employees", { HR: "Anthony", MIS: " Clint", Accounting: "Mark" });
// console.log('abcc:',a);
module.exports={
    hmset: (key,value) => {
        const query= util.promisify(client.HMSET).bind(client);
        return query(key,value);
    },
    //Lấy dữ liệu theo key: field1 value1 field2 value2
    hgetall:(key)=>{
        const query= util.promisify(client.HGETALL).bind(client);
        // const query1= client.hgetall("employees", function(err, object) {
        //     console.log('akjlasdjl',object);
        //   });
        // console.log("avc",query(key))
        return query(key);
    },
    //Lấy dữ liệu từ key field: => value
    hget: (key,field)=>{
        const query= util.promisify(client.HGET).bind(client);
        return query(key,field);
    },
    // tăng giá trị của key field => value +incValue
    hincrby: (key,field,incValue)=>{
        const query= util.promisify(client.HINCRBY).bind(client);
        return query(key,field,incValue);
    },
    // Xóa key
    del: (key)=>{
        const query= util.promisify(client.DEL).bind(client);
        return query(key);
    },
    // xóa field trong hash key-value
    hdel: (key,field)=>{
        const query= util.promisify(client.HDEL).bind(client);
        return query(key,field);
    },
    // Tạo key-value theo list
    sadd: (key,value)=>{
        const query= util.promisify(client.SADD).bind(client);
        return query(key,value);
    },
    // Xem giá trị trong list
    smembers: (key)=>{
        const query= util.promisify(client.SMEMBERS).bind(client);
        return query(key);
    },
    //Xóa giá trị khỏi chuỗi
    srem: (key,value)=>{
        const query= util.promisify(client.SREM).bind(client);
        return query(key,value);
    },
    
};