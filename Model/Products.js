const {Schema, model} = require("mongoose")


const userSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    description :{
        type : String,
        required : true
    },
    category : {
        type : String,
        enum : ["Clothes","Books","Fragrance","Shoes","Furneture"]

    },
    price : {
        type : Number,
        required : true,
        min : 0
    },
    stock : {
        type : Number,
        required : true,
        min : 1
    },
    review : [
        {
            type : String,
            givenBy :{
                type : mongoose.Schema.Type.ObjectId,
                ref : "User"
            }
        }
    ]
},{timestamps : true })


const Product = ("Product",userSchema)

module.exports = Product


