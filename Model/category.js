const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
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