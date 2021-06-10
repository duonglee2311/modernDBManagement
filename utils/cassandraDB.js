const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
    contactPoints: ['127.0.0.1'],
    localDataCenter: 'datacenter1',
    keyspace: 'tikin'
});

client.connect(function(err, result){
    console.log('index: cassandra connected')
})

module.exports =client;
// module.exports = {
//     //Get all user
//     getAllUser: async(req,res)=>{

//     }
// };