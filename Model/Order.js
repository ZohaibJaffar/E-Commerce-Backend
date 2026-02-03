const {Schema , model}= require("mongoose");

const orderSchema = new Schema({
    user:{
        type : Schema.Types.ObjectId,
        ref : "User",
        populate : true
    },

    item : [{
        type : Schema.Types.ObjectId,
        ref : "Product",
    }],

       shippingAddress: {
      fullName: String,

      phone: String,

      address: String,

      city: String,

      postalCode: String,

      country: {
        type: String,

        default: "Pakistan",

      }},

    orderStatus : {
        type : String,

        enum : ["Pending",

        "Confirmed",

        "Processing",

        "Shipped",

        "Delivered",

        "Cancelled",

        "Returned"],
        default : "Pending"
    },
    paymentDetail : {
        type : Schema.Types.ObjectId,
        ref : "Payment",
        populate : true
    }
},{timestamps : true})

const Order = model("Order",orderSchema)

module.exports = Order