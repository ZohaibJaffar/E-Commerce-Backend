const {Schema, model } = require('mongoose')

const customerSchema = new Schema({
    fullName : {
        type : String,
        required : true,
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    phone : {
        type : Number,
        required : true
    },

    age : {
        type : Number,
        required : true
    },

    city:{
        type : String,
        required : true
    },

      isActive: {
      type: Boolean,
      default: true,
    },

    address : {
        type : String,
        required : true 
    },
    
    totalOrders: {
      type: Number,
      default: 0,
    },

    totalSpent: {
      type: Number,
      default: 0,
    },

    notes: String,
  },
  {
    timestamps: true,
  }
)

const Customer = model("Customer",customerSchema)

module.exports = Customer