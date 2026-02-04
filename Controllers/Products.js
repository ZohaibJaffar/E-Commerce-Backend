const Category = require('../Model/category.js');
const slugify = require("slugify")
const Product = require("../Model/Products.js")
async function GetAllProduct(req,res){
    try {
        const allProducts = await Product.find({}).populate("category","name -_id")
        .select(["-_id","-createdAt","-updatedAt","-__v"]).lean()
        //this is use for assiging the name only to category
        allProducts.forEach(product => {
            if (product.category && product.category.name) {
                product.category = product.category.name;
            }
        });
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
async function PostNewProduct(req,res){
    try {
        const {title,
                description,
                category,
                price,
                stock,
                review
            } = req.body
            const categoryObj = await Category.findOne({name : category}).select("_id")
            if(!categoryObj){
                return res.status(400).json({
                    status : "failed",
                    message : "Category doesn't exist"
                })
            }
        const newProduct = await Product.create({
                title,
                description,
                slug : slugify(title),
                category : categoryObj._id, // it is used for assigning ID to the category
                price,
                stock,
                review
        })
        res.status(201).json({status : "Success",message : "Created Successfully"})
        
    } catch (error) {
        res.status(400).json({
            status : "Failed",
            message : error.message
        })
    }
    
}
async function GetNewProduct(req,res){
    res.status(200).json({
        status : "Success",
        message : "You are in add product page"
    })
}

async function GetSingleProduct(req,res){
    const {url} = req.params
    try {
        const foundProduct = await Product.findOne({slug : url }).populate("category","name -_id")
        .select("-_id title description images category price stock review").lean()
        if(!foundProduct){
            return res.status(404).json({
                status : "Failed",
                message : "404: page not found"
            })
        }
        if (foundProduct.category) {
            foundProduct.category = foundProduct.category.name;
        }
        res.status(200).json({
            status : 'success',
            message : foundProduct
        })
    } catch (error) {
        res.status(500).json({
            status : 'Failed',
            message : error.message
        })
    }
}

async function DeleteSingleProduct(req,res){
    try {
        const {url} = req.params
        const singleProducts = await Product.findOneAndDelete({slug : url})
        if(!singleProducts){
           return res.status(404).json({
                status : "Failed",
                message : "404 page not found"
            })
        }
        res.status(200).json({
            status : 'success',
            message : "Product Deleted Successfully"
        })
    } catch (error) {
        res.status(500).json({
            status : 'Failed',
            message : error.message
        })
    }
}
async function PatchSingleProduct(req,res){
    try {
        const {url} = req.params
        const updatedData = req.body 
        const singleProducts = await Product.findOneAndUpdate({slug : url},updatedData,{new: true, runValidators: true })
        if(!singleProducts){
           return res.status(404).json({
                status : "Failed",
                message : "404 page not found"
            })
        }
        res.status(200).json({
            status : 'success',
            data : singleProducts
        })
    } catch (error) {
        res.status(500).json({
            status : 'Failed',
            message : error.message
        })
    }
}


module.exports = {GetAllProduct,
    PostNewProduct,
    GetNewProduct,
    GetSingleProduct,
    DeleteSingleProduct,
    PatchSingleProduct
    }
