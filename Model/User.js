const {Schema, model } = require('mongoose')

const userSchema = new Schema({
    fullName : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
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
    address : {
        type : String,
        required : true 
    }
})