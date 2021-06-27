const { Result } = require('neo4j-driver-core');
const db=require('../utils/neo4j');
const cartModel=require('./cart.model');

const buyerNode='Buyer';
const productNode='Product';
const deliveryNode='Delivery';
const paymentNode='Payment';
const orderNode='Order';
const sellerNode='Seller';
const product_R_Order='INCLUDED_IN';
const product_R_Seller='HAVE';
const Order_R_Buyr='ORDERED_BY';
const Order_R_delivery='DELIVERYTYPE_IN';
const Order_R_payment='PAID_IN';
const getResult=(result)=>{
    let orderList=[];
    result.records.forEach(element => {
        let ob= {};
        for (const i in element.keys) {
            ob[element.keys[i]]=element._fields[i];
        }
        // console.log('order: ',ob);
        orderList.push(ob);
    });
    return orderList;
}
module.exports={
    async setOrder(buyerID,buyerValue){
       try {
           //Tạo node buyer
           // buyerValue là Object: thông tin đặt hàng có chứa cả id của User
           console.log('buerValue',buyerValue);
           let paymentType=buyerValue.paymentType;
           let stringBuyer=`{userID: "${buyerID}", email:"${buyerValue.email}"}`;
        //    console.log('buyer',stringBuyer)
           let isSuccess= (await db.mergeNode(buyerNode,stringBuyer)).summary.counters._stats.nodesCreated;
        //    console.log("buyer: ",isSuccess)
           //Tạo node order
           /**
            * load dữ liệu cart từ redis lên
            * loop: tính ra total
            * tạo node order: orderDate, total, name: productname[0]+ và n-1 sản phẩm
            */
           let product= await cartModel.showCart(buyerID);
           let totalAmount=0; 
           console.log('product:',product)
           orderName=product.length==1? product[0].name: (product[0].name+' và ' +(product.length-1)+' sản phẩm khác');
           product.forEach(element => {
               totalAmount+=parseFloat(element.price)*parseFloat(element.quantity);
           });
           console.log(product.length);
           console.log(product[0].name);
           console.log('orderName',orderName);
           console.log('totalAmount:',totalAmount);
           let orderDate=Date.now();
           let orderId=`${buyerID}`+orderDate;
           orderValue=`{orderId: "${orderId}",orderName: "${orderName}", orderDate: "${orderDate}", firstName: "${buyerValue.firstName}", lastName: "${buyerValue.lastName}", phoneNumber: "${buyerValue.phoneNumber}",address: "${buyerValue.address}",totalAmount: "${totalAmount}",currentStatus:"Processing"}`;
           isSuccess= (await db.createNode(orderNode,orderValue)).summary.counters._stats.nodesCreated;
    
           //tạo relationship giữa buyer và order
           isSuccess= (await db.createRelationship(orderNode,orderValue,Order_R_Buyr,-1,buyerNode,stringBuyer)).summary.counters._stats.relationshipsCreated;
           //tạo relationship giữa delivery: status="Process" với order
           let relationshipValue='{delDatetime: "'+Date.now()+'"}'
           isSuccess=(await db.createRelationship(deliveryNode,'{name: "Processing"}',Order_R_delivery,relationshipValue,orderNode,orderValue)).summary.counters._stats.relationshipsCreated;
           //tạo relationship giữa order và payment
           isSuccess=(await db.createRelationship(paymentNode,'{type: "'+paymentType+'"}',Order_R_payment,-1,orderNode,orderValue)).summary.counters._stats.relationshipsCreated;
           //loop:
           //Tạo product
           //Tạo seller
           //tạo relationship giữa product với seller
           //tạo relationship giữa  product với order
           //end loop;
           product.forEach(async(element)=>{
               // Tạo product
               let productValue=`{id: "${element.id}",name: "${element.name}",image:"${element.image}",price:"${element.price}"}`;
            //    console.log(productValue);
               isSuccess= (await db.mergeNode(productNode,productValue)).summary.counters._stats.nodesCreated;
               // Tạo seller
               let sellerValue=`{id: "${element.sellerID}", name: "${element.sellerName}"}`;
               isSuccess= (await db.mergeNode(sellerNode,sellerValue)).summary.counters._stats.nodesCreated;
               //Tạo reelationship giữa product và seller
               isSuccess=(await db.createRelationship(sellerNode,sellerValue,product_R_Seller,-1,productNode,productValue)).summary.counters._stats.relationshipsCreated;
               //Tạo relationship giữa product và order
               relationshipValue= '{number: "'+element.quantity+'"}';
               isSuccess=(await db.createRelationship(productNode,productValue,product_R_Order,relationshipValue,orderNode,orderValue)).summary.counters._stats.relationshipsCreated;
           });
            // Xoá cart trong redis
            await cartModel.deleteCart(buyerID);
            return 1;
       } catch (error) {
           console.log('Error at: /order/setOrder', error);
           return -1
       }
    },
    async getOrder(nodeID, nodeType){
        //nodeType: 0: buyer, 1: seller
        let orderList=[];
        let nodeList,nodeExpression,results,isSorted;
        if(nodeType==0){
            // lấy danh sách đơn hàng của buyer theo thứ tự delivery
            nodeList=`(n:${buyerNode})-[${Order_R_Buyr}]-(o:${orderNode})`;//-[d:${Order_R_delivery}]-(deli:${deliveryNode})`;
            nodeExpression=`n.userID="${nodeID}" WITH DISTINCT o`;
            results='o.orderId as orderId,o.orderName as orderName,o.totalAmount as totalAmount ,o.orderDate as orderDate,o.currentStatus as delivery';// ,deli.name as delivery';
        }else if(nodeType==1){
            nodeList=`(n:${sellerNode})-[${product_R_Seller}]-(p:${productNode})-[:${product_R_Order}]-(o:${orderNode})`;
            nodeExpression=`n.id="${nodeID}" WITH DISTINCT o`;
            results='o.orderId as orderId,o.orderName as orderName,o.totalAmount as totalAmount ,o.orderDate as orderDate,o.currentStatus as delivery';
            isSorted='o.orderDate';
        }
        else{
            return -1;
        }
        results= await db.matchNode(nodeList,nodeExpression,results,isSorted);
        // console.log('abc: ',results);
        orderList=getResult(results);
        orderList.forEach(item=>{
            let dateValue=new Date(parseInt(item.orderDate));
            item.orderDate=dateValue.getDate()+'/'+dateValue.getMonth()+'/'+dateValue.getFullYear();
        });
        // console.log('order',orderList)
        
        return orderList;
        // lấy danh sách đơn hàng của buyer theo thứ tự delivery
    },
    async getOrderDetail(nodeID){
        try {
            let fulledOrderDetail;
            let orderHeader,orderDelivery,detailProduct;
            let node,expression,returnValue,results;
            node=`(o:${orderNode})-[:${Order_R_payment}]-(p:${paymentNode})`;
            expression=`o.orderId="${nodeID}"`;
            returnValue=`o.orderId as orderId, o.orderDate as orderDate, o.orderName as orderName,o.lastName as lastName,o.firstName as firstName,o.address as address, o.phoneNumber as phoneNumber, o.currentStatus as currentStatus, o.totalAmount as totalAmount,p.type as payment`;
            results= await db.matchNode(node, expression,returnValue);
            orderHeader= getResult(results);
            // orderHeader[0].currentStatus= orderHeader[0].currentStatus=="Processing"? true: false;
            node=`(o:${orderNode})-[de:${Order_R_delivery}]-(d:${deliveryNode})`;
            sort='de.delDatetime'
            returnValue=`o.orderId as orderId,de.delDatetime as dateOrder,d.name as status`;
            results= await db.matchNode(node, expression,returnValue,sort);
            orderDelivery= getResult(results);
            // orderDelivery.
            orderDelivery.forEach(item=>{
                let dateValue=new Date(parseInt(item.dateOrder));
                item.dateOrder=dateValue.getHours()+":"+dateValue.getMinutes()+" "+dateValue.getDate()+'/'+dateValue.getMonth()+'/'+dateValue.getFullYear();
                if(item.status=='Processing'){
                    item.status='Tiki đã tiếp nhận đơn hàng, vui lòng đợi cửa hàng xử lý đơn hàng.';
                }
                else if(item.status=='Transporting'){
                    item.status='Tiki đang vận chuyển đơn hàng.'
                }
                else if(item.status=='Success'){
                    item.status='Tiki đã giao hàng thành công.'
                }else{
                    item.status='Tiki đã tiếp nhận yêu cầu hủy đơn hàng'
                }
            })
            node=`(o:${orderNode})-[i:${product_R_Order}]-(p:${productNode})`;
            // sort='de.delDatetime'
            returnValue=`p.id as id,p.name as name,p.image as image, p.price as price, i.number as quantity`;
            results= await db.matchNode(node, expression,returnValue);
            detailProduct= getResult(results);
            detailProduct.forEach(element=>{
                element.subTotal=parseInt(element.quantity)*parseFloat(element.price);
            })
            // console.log('detailProduct',detailProduct);
            fulledOrderDetail={
                orderInfo: orderHeader,
                delivery: orderDelivery,
                product: detailProduct
            };
            return fulledOrderDetail;

        } catch (err) {
            console.log(err)
            return -1;
        }
    },
    async updateOrder(orderId,deliveryName){
        let results;
        let valueDelivery,valueOrder,timeCreated; 
        valueDelivery=`{name: "${deliveryName}"}`;
        valueOrder=`{orderId: "${orderId}"}`;
        timeCreated='{delDatetime: "'+Date.now()+'"}';
        results=await db.createRelationship(orderNode,valueOrder,Order_R_delivery,timeCreated,deliveryNode,valueDelivery);
        results=await db.updateNode(orderNode,valueOrder,`p.currentStatus="${deliveryName}"`);
        return 1;
    }
};

