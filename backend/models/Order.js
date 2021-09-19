import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
  allCart: [
    {
      cart: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Cart",
      },
    },
  ],

  amount: {
    type: Number,
    required: true,
  },
  adresse: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;
