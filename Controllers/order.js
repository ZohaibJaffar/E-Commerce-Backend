const Order = require("../Model/Order.js")
const Payment = require("../Model/Payment.js")
const User = require('../Model/user.js')
const Product = require("../Model/Products.js")
async function PostOrder(req,res){
    try {
        const {slug} = req.user
        const {url} = req.params
        const {
           fullName,
           phone,
           address,
           city,
           postalCode,
           currency,
           method,
           country,
    
        } = req.body
        const user = await User.findOne({slug : slug}).select('_id')
        const product = await Product.findOne({slug : url}).select('_id price')
        console.log(product)
    
        const newOrder = await Order.create({
            user : user,
            item : product,
           shippingAddress : {
           fullName,
           phone,
           address,
           city,
           postalCode,
           country,
          }
    
        });
        const payment = await Payment.create({
                user: user._id,
                order: newOrder._id, // Now you have the reference!
                amount : product.price,
                currency,
                method,
                currency: currency || "PKR",
                status: "Pending"
            });
    
            newOrder.paymentDetail = payment._id;
            await newOrder.save();
    
            res.status(201).json({
                success: true,
                order: newOrder,
                payment
            });
        
    } catch (error) {
    res.status(500).json({ message: error.message });
    }


}
async function GetAllOrder(req,res){
    try {
        const allProducts = await Order.find({}).select('-_id shippingAddress item user orderStatus paymentDetail')
        .populate('user','userName -_id')
        .populate('paymentDetail','-_id amount currency method status')
        .populate('item','title -_id').lean()
         allProducts.forEach(product => {
            if (product.user && product.user.userName) {
                product.user = product.user.userName;
            }
            if(product.item){
                product.item.forEach((i)=>{
                    product.item = product.item.map((name)=>name.title)
                })
            }
        })
        res.status(200).json({
            status : 'success',
            length : allProducts.length,
            data : allProducts
        })
    }catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}
async function GetSingleOrder(req,res){
    try {
        const id = req.params.url; // Make sure your route is /order/:id

        // 1. Use findById and populate the references
        const data = await Order.findById(id).select('-_id shippingAddress item user orderStatus paymentDetail')
            .populate('user', 'userName -_id')
            .populate('item', 'title -_id')
            .populate('paymentDetail', '-_id amount method status')
            .lean(); // .lean() is required to modify the object later

        // 2. Handle if the order doesn't exist
        if (!data) {
            return res.status(404).json({
                status: "fail",
                message: "No order found with that ID"
            });
        }

        // 3. Flatten the fields (just like you did in GetAllOrders)
        if (data.user) data.user = data.user.userName;
        if (data.item) data.item = data.item.map(i => i.title);

        res.status(200).json({
            status: "success",
            data: data
        });

    } catch (error) {
        // This catches invalid ObjectIDs or server errors
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
}

async function PatchOrder(res,res){
    try {
        const { url } = req.params; // Make sure this is the actual ID string
        const data = req.body;

        const updatedOrder = await Order.findOneAndUpdate(
            { _id: url }, 
            data, 
            { new: true, runValidators: true }
        )
        .select('-_id shippingAddress item user orderStatus paymentDetail')
        .populate('user', 'userName -_id')
        .populate('paymentDetail', '-_id amount currency method status')
        .populate('item', 'title -_id')
        .lean();

        if (!updatedOrder) {
            throw new Error("Order not found");
        }

        // Fix 1: Flatten User
        if (updatedOrder.user && updatedOrder.user.userName) {
            updatedOrder.user = updatedOrder.user.userName;
        }

        // Fix 2: Clean Flattening of Items (No forEach needed!)
        if (updatedOrder.item && Array.isArray(updatedOrder.item)) {
            updatedOrder.item = updatedOrder.item.map(i => i.title);
        }

        res.status(200).json({
            status: 'success',
            message: "Updated Successfully",
            data: updatedOrder // Usually you want to see the updated data!
        });

    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }


}
module.exports = {
    PostOrder,
    GetAllOrder,
    GetSingleOrder,
    PatchOrder

}