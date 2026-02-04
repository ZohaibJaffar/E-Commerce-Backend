const {Schema, model} = require("mongoose")


const userSchema = new Schema({
    title : {
        type : String,
        required : [true, "Need a title for product"],
        unique : [true,"The Product is already exists"]
    },
    description :{
        type : String,
        required : [true,"Description is required"]
    },
    slug : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        unique :[true , "This URL is not Availible"]
    },
    images : [{
        type : String,
        required : [true,"Images are required"]
    }],
    category : {
        type : Schema.Types.ObjectId,
        ref : 'Category',
        required : [true,"Category is required"]

    },
    price : {
        type : Number,
        required : [true,"Price is required"],
        min : 0
    },
    stock : {
        type : Number,
        required : [true,"Stock is required"],
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


