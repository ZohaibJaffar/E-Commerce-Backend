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
            rating : {
                type : Number,
                min : 0,
                max : 5
            },
            comment : {
                type : String

            },
            givenBy :{
                type : Schema.Types.ObjectId,
                ref : "User"
            }
        }
    ]
},{timestamps : true })


const Product = model("Product",userSchema)

module.exports = Product


