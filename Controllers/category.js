const Category = require('../Model/category.js');
const slugify = require("slugify")

async function PostHandleCategory(req,res){
    try {
        const {
          name,
          parent,
          isActive,
          image
        }
         = req.body
            const newCategory = await Category.create({
          name,
          slug : slugify(name),
          parent : parent || null,
          isActive,
          image
        })
        res.status(201).json({
            status : "Success",
            data : newCategory
        })   
    } catch (error) {
        res.status(400).json({
            status : "Failed",
            message : error.message
        })
    }
}
async function GetHandleCategory(req,res){
    try {
         const category_ind =   await Category.find({})

         if(!category_ind){
            return res.status(404).json({
                status : "Failed",
                message : "404: page not found"
            })
         }

         res.status(200).json({
            status : "success",
            data : category_ind
         })
    } catch (error) {
        res.status(400).json({
            status : "Failed",
            message : error.message
        })
    }
}


async function GetHandleCategoryIndividual(req,res){
    try {
        const { url } = req.params
         const category_ind =   await Category.findOne({$and : [{slug : url},{isActive : true}]})
         .select(["-_id","-slug","-createdAt","-updatedAt"])

         if(!category_ind){
            return res.status(404).json({
                status : "Failed",
                message : "404: page not found"
            })
         }

         res.status(200).json({
            status : "success",
            data : category_ind
         })
    } catch (error) {
        res.status(400).json({
            status : "Failed",
            message : error.message
        })
    }
}

async function PatchtHandleCategoryIndividual(req,res){
    try {
        const { url } = req.params
        const updateData = req.body
         const category_ind =   await Category.findOneAndUpdate(
            {slug : url},
            updateData,{new: true,
            runValidators: true}
        )
         if(!category_ind){
            return res.status(404).json({
                status : "Failed",
                message : "404: page not found"
            })
         }

         res.status(200).json({
            status : "success",
            data : category_ind
         })
    } catch (error) {
        res.status(400).json({
            status : "Failed",
            message : error.message
        })
    }
}

async function DeleteHandleCategoryIndividual(req,res){
    try {
        const { url } = req.params
         const category_ind =   await Category.findOneAndDelete({slug : url})
         if(!category_ind){
            return res.status(404).json({
                status : "failed",
                message : "404: Page not found"
            })
         }
         res.status(200).json({
            status : "success",
            message : "Category is Deteled successfully"
         })
    } catch (error) {
        res.status(400).json({
            status : "Failed",
            message : error.message
        })
    }
}


module.exports = {
    GetHandleCategory,
    PostHandleCategory,
     GetHandleCategoryIndividual,
     DeleteHandleCategoryIndividual,
    PatchtHandleCategoryIndividual,
}