const client = require('.././utils/cassandraDB');
// const redis = require('.././utils/redis');
const USERTABLE="tikin.user"
module.exports = {
    getAllUser: async () => {
        var getAllUser = `SELECT * FROM ${USERTABLE}`;
        var kq = await client.execute(getAllUser, []);
        return kq.rows;
    },
    getOneUser: async (id) => {
        var getUser = `SELECT * FROM tikin.user WHERE id = ${id}`;
        var kq = await client.execute(getUser, []);
        return kq.rows;
    },
    checkUser: async (username, password) => {
        var query = `SELECT * FROM tikin.user WHERE username = '${username}' and password = '${password}' ALLOW FILTERING`;
        var result = await client.execute(query,[]);
        return result.rows;
    },
    storeUser: async (username, password, fullname, phoneNumber, gender, dob, avatar, address) => {
        var query = `INSERT INTO tikin.user (id,username, password, fullname, phonenum, gender, dateofbirth, avatar,address) VALUES(uuid(),'${username}','${password}','${fullname}','${phoneNumber}','${gender}','${dob}','${avatar}','${address}')`;
        var result = await client.execute(query,[]);
        return result;
    },
    updateUser: async (id,username, password, fullname, phoneNumber, gender, dob, avatar, address) => {
        var query = `UPDATE tikin.user SET username = '${username}', password = '${password}', fullname = '${fullname}',phonenum = '${phoneNumber}',gender='${gender}',dateofbirth='${dob}',avatar='${avatar}',address='${address}' WHERE id=${id}`;
        var result = await client.execute(query,[]);
        return result;
    },
    deleteUser: async function(id){
        var query = `DELETE FROM tikin.user WHERE id = ${id}`;
        var result = await client.execute(query,[]);
        return result;
    }
}