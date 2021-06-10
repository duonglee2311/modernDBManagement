const db = require('../utils/redis');

module.exports ={
    createSession: async(userID, detail)=>{
        const sessionKey='Session:'+userID;
        return await db.hmset(sessionKey,detail);
    },
    showSession: async(userID) => {
        const sessionKey='Session:'+userID;
        return await db.hgetall(sessionKey);
    }
}