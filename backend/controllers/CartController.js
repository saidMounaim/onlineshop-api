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

//@DESC Update Cart
//@ROUTE /api/v1/cart/:id
//@METHOD PUT
export const updateCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findById(req.params.id);

  if (cart.user._id.toString() !== req.user.id.toString()) {
    res.status(404);
    throw new Error("Can not update this cart");
  }

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });

  res.status(201).json({ success: true, data: cart });
});

//@DESC Delete Cart
//@ROUTE /api/v1/cart/:id
//@METHOD DELETE
export const deleteCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findById(req.params.id);

  if (cart.user._id.toString() !== req.user.id.toString()) {
    res.status(404);
    throw new Error("Can not delete this cart");
  }

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  cart = await Cart.findByIdAndDelete(req.params.id);

  res.status(201).json({ success: true, data: {} });
});
