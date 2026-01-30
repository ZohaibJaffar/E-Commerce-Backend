const {Schema , model, default: mongoose}= require("mongoose");

const orderSchema = new Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    productId : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product"
    }]
},{timestamps : true})

const Order = model("Order",orderSchema)

module.exports = Order