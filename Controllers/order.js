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
        const user = await User.findOne({slug : slug}).select('_id totalOrders totalSpent')
        const product = await Product.findOne({slug : url}).select('_id price')
    
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
            // 5. UPDATE USER STATS (Atomic Update)
        // This increments totalOrders by 1 and totalSpent by the product price
        await User.findByIdAndUpdate(user._id, {
            $inc: { 
                totalOrders: 1, 
                totalSpent: product.price 
            }
        });
            res.status(201).json({
            status : "success",
            order: {
            id: newOrder._id,
            status: newOrder.status, // assuming your schema has this
            total: product.price
            },
            payment: {
            method: payment.method,
            status: payment.status,
            currency: payment.currency
            }
});
        
    } catch (error) {
    res.status(500).json({ message: error.message });
    }


}
async function GetAllOrder(req,res){
    try {
        const allProducts = await Order.find({}).select('_id shippingAddress item user orderStatus paymentDetail')
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
async function GetSingleOrder(req, res) {
    try {
        const orderId = req.params.url;
        const requesterId = req.user._id; // ID of the person logged in
        const requesterRole = req.user.role; // e.g., "Admin", "Manager", "User"

        // 1. Fetch the order first to see who owns it
        const order = await Order.findById(orderId)
            .populate('user', 'userName _id') // We need _id to compare ownership
            .populate('item', 'title -_id')
            .populate('paymentDetail', '-_id amount method status')
            .lean();

        if (!order) {
            return res.status(404).json({
                status: "fail",
                message: "No order found with that ID"
            });
        }

        // 2. PERMISSION CHECK
        // Allow if user is Admin OR Manager
        const isStaff = requesterRole === "Admin" || requesterRole === "Manager";
        
        // Allow if the Order's user ID matches the Requester's ID
        const isOwner = order?.user && order?.user?._id.toString() === requesterId?.toString();

        if (!isStaff && !isOwner) {
            return res.status(403).json({
                status: "fail",
                message: "You do not have permission to view this order"
            });
        }

        // 3. Flatten/Clean data for response
        if (order.user) order.user = order.user.userName;
        if (order.item) {
            // Check if item is an array or single object based on your schema
            order.item = Array.isArray(order.item) ? order.item.map(i => i.title) : order.item.title;
        }

        res.status(200).json({
            status: "success",
            data: order
        });

    } catch (error) {
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