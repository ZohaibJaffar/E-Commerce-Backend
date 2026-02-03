const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "PKR",
    },

    method: {
      type: String,
      enum: ["COD", "Card", "Bank", "JazzCash", "EasyPaisa"],
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Success", "Failed", "Refunded"],
      default: "Pending",
    },

    transactionId: String,
    paidAt: Date,

    refund: {
      amount: Number,
      refundedAt: Date,
      reason: String,
    },

    failureReason: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Payment", paymentSchema);
