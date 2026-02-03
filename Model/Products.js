const {Schema, model} = require("mongoose")


const userSchema = new Schema({
    title : {
        type : String,
        required : [true, "Need a title for product"],
        unique : [true,"The Product is already exists"]
    },
    description :{
        type : String,
        required : true
    },
    slug : {
        type : String,
        required : true,
        trim : true
    },
    images : [{
        type : String,
        required : true
    }],
    category : {
        type : Schema.Types.ObjectId,
        ref : 'Category'

    },
    price : {
        type : Number,
        required : true,
        min : {$gt : 0}
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


