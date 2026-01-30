const Product = require("../Model/Products.js")

async function handleGetAllProduct(req,res){
    try {
        const allProducts = await Product.find({})
        res.status(200).json({
            status : 'success',
            message : allProducts
        })
    } catch (error) {
        res.status(500).json({
            status : 'Failed',
            message : error.message
        })
    }
}



