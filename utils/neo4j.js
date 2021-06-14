var neo4j = require('neo4j-driver');
const { join } = require('path');
const util= require('util');
var driver = neo4j.driver(
    'bolt://localhost:7687',
    neo4j.auth.basic('admin','123456')
  );

  //select {} from {} where {}
const neo_query=async (query)=>{
    let session =driver.session({database: 'demo',});
    let results=await session.run(query);
    session.close();
    return results;
}

// const neo_query= util.promisify(session.run).bind();
module.exports={
    createNode:async (nodeLabel,nodeValue)=>{
        // return session.run(`CREATE (:${nodeLabel} ${nodeValue});`);
        let query=`CREATE (:${nodeLabel} ${nodeValue});`;
        let results=await neo_query(query);
        return results
    },
    mergeNode:async (nodeLabel,nodeValue)=>{
        // return session.run(`MERGE (:${nodeLabel} ${nodeValue});`);
        let query=`MERGE (:${nodeLabel} ${nodeValue});`;
        let results=await neo_query(query);
        return results;
    },
    createRelationship:async (nodeLabel1,nodeValue1,relName,relValue,nodeLabel2,nodeValue2)=>{
        let query;
        if(relValue ==-1)
            query= `MATCH (X:${nodeLabel1} ${nodeValue1}),(Y:${nodeLabel2} ${nodeValue2}) MERGE (X)-[:${relName}]-(Y)`;
        else{
            query= `MATCH (X:${nodeLabel1} ${nodeValue1}),(Y:${nodeLabel2} ${nodeValue2}) MERGE (X)-[:${relName} ${relValue}]-(Y)`;
        }
        let results=await neo_query(query);
        return results; 
        // return session.run(`MATCH (X:${nodeLabel1} $para1),(Y:${nodeLabel2} $para2) MERGE X-(:${relName} $para3)-Y`,{para1: nodeValue1,para2:nodeValue2,para3:relValue})
    },
    countNode:async (nodeLabel,nodeValue)=>{
        // đếm số node hiện có trong graph, dùng để xác định node đó đã tạo chưa
        // console.log("showwwww", nodeValue)
        let query=`MATCH (n:${nodeLabel} ${nodeValue}) with count(*) as count return count;`;
        return await neo_query(query);
    },
    updateNode:async (nodeLabel,nodeValue, updateValue)=>{
        try {
            
        } catch (error) {
            
        }
        return session.run(`MATCH (p: ${nodeLabel} {name: “Jennifer”}) SET p.birthday = date(“1999-01-01”)`);
    },
    matchNode:async (nodeList,expression, results,orderBy)=>{
        let query;
        if(!orderBy){
            query=`MATCH ${nodeList} WHERE ${expression} RETURN ${results}`
        }
        else{
            query=`MATCH ${nodeList} WHERE ${expression} RETURN ${results} ORDER BY ${orderBy}`;
        }
        return await neo_query(query);
        // return session.run(`MATCH ${nodeList} WHERE ${expression} RETURN ${results}`);  
    }
}

// deleteNode:(nodeLabel,nodeValue)=>{
//     return session.run(`MATCH (X:${nodeLabel} $para1) DELETE X;`,{para1: nodeValue});
// },
// deleteRelationship:(nodeLabel1,nodeValue1,nameRelationship,nodeLabel2,nodeValue2)=>{
//     return session.run(`MATCH (X:${nodeLabel1} $para1) -[R:${nameRelationship}]- (Y:${nodeLabel2} $para2) DELETE R;`,
//     {para1: nodeValue1, para2: nodeValue2});
// },