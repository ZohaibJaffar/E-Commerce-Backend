const Category = require('../Model/category.js');
const Product = require("../Model/Products.js")

async function GetAllProduct(req,res){
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
async function PostNewProduct(req,res){
    
    const {title,
            description,
            category,
            price,
            stock,
            review
        } = req.body
    const newProduct = await Product.create({
            title,
            description,
            category,
            price,
            stock,
            review
    })
    const data = newProduct
    res.status(201).json({status : "Success",message : data})
}
async function GetNewProduct(req,res){
    res.status(200).json({
        status : "Success",
        message : "You are in add product page"
    })
}


async function PostHandleCategory(req,res){
const {
  name,
  slug,
  description,
  parent,
  isActive,
  image
}
 = req.body
    const newCategory = await Category.create({
  name,
  slug,
  description,
  parent,
  isActive,
  image
})
res.status(201).json({
    status : "Success",
    data : newCategory
})
}

module.exports = {GetAllProduct,PostNewProduct,GetNewProduct,PostHandleCategory}
