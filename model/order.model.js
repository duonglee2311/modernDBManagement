const db=require('../utils/neo4j');
const cartModel=require('./cart.model');

const personNode='Buyer1';
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
           let payMentType='Cash';
           let stringBuyer=`{userID: ${buyerID}, firstName: "Duong", lastName: "Le", email:"duong@gmail.com,"}`;
           let isSuccess= (await db.mergeNode(personNode,stringBuyer)).summary.counters._stats.nodesCreated;
           console.log("buyer: ",isSuccess)
           //Tạo node order
           /**
            * load dữ liệu cart từ redis lên
            * loop: tính ra total
            * tạo node order: orderDate, total
            */
           let product= await cartModel.showCart(buyerID);
           console.log("productlist",product)
           let totalAmount=0;
           product.forEach(element => {
               totalAmount+=parseFloat(element.price);
           });
           orderValue=`{orderDate: "`+ (new Date())+`",totalAmount: ${totalAmount}}`;
           isSuccess= (await db.createNode(orderNode,orderValue)).summary.counters._stats.nodesCreated;
           console.log("order",isSuccess);
    
           //tạo relationship giữa buyer và order
           isSuccess= (await db.createRelationship(orderNode,orderValue,Order_R_person,-1,personNode,stringBuyer)).summary.counters._stats.relationshipsCreated;
           console.log("relationship: ",isSuccess)
           //tạo relationship giữa delivery: status="Process" với order
           let relationshipValue='{delDatetime: "'+Date()+'"}'
           isSuccess=(await db.createRelationship(deliveryNode,'{name: "Processing"}',Order_R_delivery,relationshipValue,orderNode,orderValue)).summary.counters._stats.relationshipsCreated;
           console.log("Order_R_delivery",isSuccess);
           //tạo relationship giữa order và payment
           isSuccess=(await db.createRelationship(paymentNode,'{type: "'+payMentType+'"}',Order_R_payment,-1,orderNode,orderValue)).summary.counters._stats.relationshipsCreated;
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
    async (nodeLabel,nodeValue){

    }
};

