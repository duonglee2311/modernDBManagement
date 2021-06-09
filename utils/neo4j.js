var neo4j = require('neo4j-driver');
const { join } = require('path');
const util= require('util');
var driver = neo4j.driver(
    'bolt://localhost:7687',
    neo4j.auth.basic('admin','123456')
  );

var session =driver.session({
    database: 'demo',
}
);
//select {} from {} where {}

// const neo_query= util.promisify(session.run).bind();
module.exports={
    createNode: (nodeLabel,nodeValue)=>{
        return session.run(`CREATE (:${nodeLabel} ${nodeValue});`);
    },
    mergeNode: (nodeLabel,nodeValue)=>{
        return session.run(`MERGE (:${nodeLabel} ${nodeValue});`);
    },
    createRelationship:(nodeLabel1,nodeValue1,relName,relValue,nodeLabel2,nodeValue2)=>{
        if(relValue ==-1)
            return session.run(`MATCH (X:${nodeLabel1} ${nodeValue1}),(Y:${nodeLabel2} ${nodeValue2}) MERGE (X)-[:${relName}]-(Y)`);
        return session.run(`MATCH (X:${nodeLabel1} ${nodeValue1}),(Y:${nodeLabel2} ${nodeValue2}) MERGE (X)-[:${relName} ${relValue}]-(Y)`);
        // return session.run(`MATCH (X:${nodeLabel1} $para1),(Y:${nodeLabel2} $para2) MERGE X-(:${relName} $para3)-Y`,{para1: nodeValue1,para2:nodeValue2,para3:relValue})
    },
    countNode: (nodeLabel,nodeValue)=>{
        // đếm số node hiện có trong graph, dùng để xác định node đó đã tạo chưa
        console.log("showwwww", nodeValue)
        return session.run(`MATCH (n:${nodeLabel} $para1) with count(*) as count return count;`,{para1: nodeValue});
    },
    updateNode:(nodeLabel,nodeValue, updateValue)=>{
        try {
            
        } catch (error) {
            
        }
        return session.run(`MATCH (p: ${nodeLabel} {name: “Jennifer”}) SET p.birthday = date(“1999-01-01”)`);
    },
}

// deleteNode:(nodeLabel,nodeValue)=>{
//     return session.run(`MATCH (X:${nodeLabel} $para1) DELETE X;`,{para1: nodeValue});
// },
// deleteRelationship:(nodeLabel1,nodeValue1,nameRelationship,nodeLabel2,nodeValue2)=>{
//     return session.run(`MATCH (X:${nodeLabel1} $para1) -[R:${nameRelationship}]- (Y:${nodeLabel2} $para2) DELETE R;`,
//     {para1: nodeValue1, para2: nodeValue2});
// },