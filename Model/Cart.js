
// Models/Cart.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true },
    items: [{
        _id : false,
        product: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true 
        },
        quantity: { 
            type: Number,
            default: 1 },
        price: {
             type: Number,
             required: true
             } // Snapshot of price at time of adding
    }]
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;