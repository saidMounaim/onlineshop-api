import express from "express";
import {
  getCart,
  addToCart,
  updateCart,
  deleteCart,
} from "../controllers/CartController.js";
import ProtectMiddleware from "../middlewares/ProtectMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(ProtectMiddleware, getCart)
  .post(ProtectMiddleware, addToCart);

router
  .route("/:id")
  .put(ProtectMiddleware, updateCart)
  .delete(ProtectMiddleware, deleteCart);

export default router;
