import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

//@DESC Get All Order
//@ROUTE /api/v1/orders
//@METHOD GET
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});

  res.status(201).json({ success: true, count: orders.length, data: orders });
});

//@DESC Add Order
//@ROUTE /api/v1/orders
//@METHOD POST
export const addOrder = asyncHandler(async (req, res) => {
  const cart = await Cart.find({ user: req.user.id });

  if (cart.length === 0) {
    res.status(404);
    throw new Error("Oupss your cart is empty");
  }

  const order = await Order.create({
    allCart: cart,
    amount: req.body.amount,
    adresse: req.body.adresse,
  });

  res.status(201).json({ success: true, data: order });
});

//@DESC Update Order
//@ROUTE /api/orders/:id
//@METHOD PUT
export const updateOrder = asyncHandler(async (req, res) => {
  let order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({ success: true, data: order });
});
