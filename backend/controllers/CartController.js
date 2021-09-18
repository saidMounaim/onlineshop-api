import asyncHandler from "express-async-handler";
import Cart from "../models/Cart.js";

//@DESC Get Cart Products Logged In User
//@ROUTE /api/v1/cart
//@METHOD GET
export const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.find({ user: req.user.id }).populate("user product");

  res.status(201).json({ success: true, count: cart.length, data: cart });
});

//@DESC Add To Card
//@ROUTE /api/v1/cart
//@METHOD POST
export const addToCart = asyncHandler(async (req, res) => {
  const cart = await Cart.create({
    user: req.user.id,
    products: req.body.products,
  });

  res.status(201).json({ success: true, data: cart });
});
