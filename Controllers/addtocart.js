const Cart = require("../Model/Cart.js");
const Product = require("../Model/Products.js");

async function AddToCart(req, res) {
    try {
        let {quantity} = req.body;
        const{title} = req.body;
        const userId = req.user._id; // From your auth middleware
        quantity = Number(quantity) || 1;
        // 1. Validate Product exists and is in stock
        const product = await Product.findOne({title});
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.stock < quantity) {
            return res.status(400).json({ message: "Not enough stock available" });
        }

        // 2. Find the user's cart
        let cart = await Cart.findOne({ user: userId });

        if (cart) {
            // Check if product already exists in the cart
            const itemIndex = cart.items.findIndex(item => item.product.toString() === product._id.toString());

            if (itemIndex > -1) {
                // Scenario: Product exists, just update quantity
                cart.items[itemIndex].quantity += (quantity || 1);
            } else {
                // Scenario: Cart exists, but adding a new product
                cart.items.push({ 
                    product: product._id, 
                    quantity: quantity || 1, 
                    price: product.price
                });
            }
            
            // Recalculate total price for the cart if you store it
            // cart.totalPrice = cart.items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
            
            await cart.save();
        } else {
            // Scenario: No cart exists, create a new one
            cart = await Cart.create({
                user: userId,
                items: [{ 
                    product: product._id, 
                    quantity: quantity || 1, 
                    price: product.price
                }]
            });
        }

        res.status(200).json({
            success: true,
            message: "Item added to cart"
        });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
}


async function GetUserCart(req, res) {
    try {
        const userId = req.user._id;

        // Find the cart and "populate" product details 
        // This replaces the Product IDs with actual Product data (title, price, image)
        const cart = await Cart.findOne({ user: userId }).select("-_id items")
            .populate({
                path: 'items.product',
                select: '-_id title price images' // Only get what the frontend needs
            });
        cart.items.forEach(((item)=>{
            item = item.product
        }))

        if (!cart || cart.items.length === 0) {
            return res.status(200).json({
                success: true,
                message: "Cart is empty",
                items: [],
                totalPrice: 0
            });
        }

        // Calculate total price on the fly to ensure accuracy
        let totalPrice = 0;
        cart.items.forEach(item => {
            if (item.product) {
                totalPrice += item.quantity * item.product.price;
            }
        });

        res.status(200).json({
            success: true,
            count: cart.items.length,
            totalPrice: totalPrice,
            cart: cart
        });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
}

module.exports = { AddToCart,
    GetUserCart
 };