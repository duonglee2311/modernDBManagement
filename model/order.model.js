const { Result } = require('neo4j-driver-core');
const db=require('../utils/neo4j');
const cartModel=require('./cart.model');

const personNode='Buyer';
const productNode='Product';
const deliveryNode='Delivery';
const paymentNode='Payment';
const orderNode='Order';
const sellerNode='Seller';
const product_R_Order='INCLUDED_IN';
const product_R_Seller='HAVE';
const Order_R_person='ORDERED_BY';
const Order_R_delivery='DELIVERYTYPE_IN';
const Order_R_payment='PAID_IN';

module.exports={
    async setOrder(buyerID,buyerValue){
       try {
           //Tạo node buyer
           // buyerValue là Object: thông tin đặt hàng có chứa cả id của User
           let paymentType=buyerValue.paymentType;
           let stringBuyer=`{userID: ${buyerID}, firstName: "${buyerValue.firstName}", lastName: "${buyerValue.lastName}", email:"${buyerValue.email}", phoneNumber: "${buyerValue.phoneNumber}"}`;
           let isSuccess= (await db.mergeNode(personNode,stringBuyer)).summary.counters._stats.nodesCreated;
           console.log("buyer: ",isSuccess)
           //Tạo node order
           /**
            * load dữ liệu cart từ redis lên
            * loop: tính ra total
            * tạo node order: orderDate, total, name: productname[0]+ và n-1 sản phẩm
            */
           let product= await cartModel.showCart(buyerID);
           console.log("productlist",product)
           let totalAmount=0; 
           orderName=product.length==1? product[0].name: product[0].name+' và' +product.length-1+' sản phẩm khác';
           product.forEach(element => {
               totalAmount+=parseFloat(element.price)*parseFloat(element.quantity);
           });
           console.log('totalAmount:',totalAmount)
           orderValue=`{orderName: "${orderName}", orderDate: "`+ (new Date())+`",totalAmount: ${totalAmount}}`;
           isSuccess= (await db.createNode(orderNode,orderValue)).summary.counters._stats.nodesCreated;
           console.log("orderNode",isSuccess);
    
           //tạo relationship giữa buyer và order
           isSuccess= (await db.createRelationship(orderNode,orderValue,Order_R_person,-1,personNode,stringBuyer)).summary.counters._stats.relationshipsCreated;
           console.log("relationship: ",isSuccess)
           //tạo relationship giữa delivery: status="Process" với order
           let relationshipValue='{delDatetime: "'+Date()+'"}'
           isSuccess=(await db.createRelationship(deliveryNode,'{name: "Processing"}',Order_R_delivery,relationshipValue,orderNode,orderValue)).summary.counters._stats.relationshipsCreated;
           console.log("Order_R_delivery",isSuccess);
           //tạo relationship giữa order và payment
           isSuccess=(await db.createRelationship(paymentNode,'{type: "'+paymentType+'"}',Order_R_payment,-1,orderNode,orderValue)).summary.counters._stats.relationshipsCreated;
           console.log("Order_R_payment",isSuccess);
           //loop:
           //Tạo product
           //Tạo seller
           //tạo relationship giữa product với seller
           //tạo relationship giữa  product với order
           //end loop;
           product.forEach(async(element)=>{
               // Tạo product
               let productValue='{id: "'+ element.id+'",name: "'+element.name +'",price:"'+ element.price+'"}';
            //    console.log(productValue);
               isSuccess= (await db.mergeNode(productNode,productValue)).summary.counters._stats.nodesCreated;
               console.log('product',isSuccess);
               // Tạo seller
               let sellerValue='{id: "'+element.idSeller+'", name: "'+ element.nameSeller+'"}';
               isSuccess= (await db.mergeNode(sellerNode,sellerValue)).summary.counters._stats.nodesCreated;
               console.log('seller:', isSuccess);
               //Tạo reelationship giữa product và seller
               isSuccess=(await db.createRelationship(sellerNode,sellerValue,product_R_Seller,-1,productNode,productValue)).summary.counters._stats.relationshipsCreated;
               console.log('product_R_seller1',isSuccess);
               //Tạo relationship giữa product và order
               relationshipValue= '{number: "'+element.quantity+'"}';
               isSuccess=(await db.createRelationship(productNode,productValue,product_R_Order,relationshipValue,orderNode,orderValue)).summary.counters._stats.relationshipsCreated;
               console.log('product_R_Order',isSuccess);
           });
            // Xoá cart trong redis
            console.log("delete cart in redis",await cartModel.deleteCart(buyerID));
            return 1;
       } catch (error) {
           console.log('Error at: /order/setOrder', error);
           return -1
       }
    },
    async getOrder(nodeID, nodeType){
        //nodeType: 0: buyer, 1: seller
        let orderList=[];
        if(nodeType==0){
            // lấy danh sách đơn hàng của seller theo thứ tự delivery
            let nodeList=`(n:${personNode})-[${Order_R_person}]-(o:${orderNode})-[d:${Order_R_delivery}]-(deli:${deliveryNode})`;
            let nodeExpression=`n.userID=${nodeID}`;
            let results='o.orderName as orderName,o.totalAmount as totalAmount ,o.orderDate as orderDate ,deli.name as delivery';
            results= await db.matchNode(nodeList,nodeExpression,results);
            results.records.forEach(element => {
                let ob= {};
                ob[element.keys[0]]=element._fields[0];
                ob[element.keys[1]]=element._fields[1].low;
                ob[element.keys[2]]=element._fields[2];
                ob[element.keys[3]]=element._fields[3];
                orderList.push(ob);
            });
            console.log('order',orderList)
        }
        // lấy danh sách đơn hàng của buyer theo thứ tự delivery
    },
};

