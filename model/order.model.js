const db=require('../utils/neo4j');

const productNode='Buyer';
const personNode='Person';
const deliveryNode='Delivery';
const paymentNode='Payment';
const orderNode='Order';
const product_R_Order='INCLUDED_IN';
const Order_R_person='ORDERED_BY';
const Order_R_delivery='DELIVERYTYPE_IN';
const Order_R_payment='PAID_IN';

module.exports={
    async setOrder(nodeLabel,nodeValue){
        /*
        Kiểm tra node có tồn tại chưa?
        -False: tạo node
        Tạo node
        */
       let isExists=(await db.countNode(nodeLabel,nodeValue)).records[0]._fields.low;
       console.log('is exists',isExists);
       if(isExists<1){
           let arr=await db.create('sv',a);
       }
       return 1;
        let a={name:'test',class: 'adf1'};
        console.log("neo4j model",a);
        //_stats: Các nội 
        //  console.log(arr.summary.counters._stats);
        // console("results:     ",a);


    },
    async (nodeLabel,nodeValue){

    }
};

