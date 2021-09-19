import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";

//@DESC Get All Order
//@ROUTE /api/v1/orders
//@METHOD GET
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});

  res.status(201).json({ success: true, count: orders.length, data: orders });
});
