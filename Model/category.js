const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: [true,"Category already exists"],
    },

    slug: {
      type: String,
      required: true,
      unique: [true, "This URL has been reserved"],
      lowercase: true,
      trim: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null, // For subcategories
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    image: {
      url: String,
      alt: String,
    },      
  },
  {
    timestamps: true,
  }
);

const Category = model("Category", categorySchema);
module.exports = Category