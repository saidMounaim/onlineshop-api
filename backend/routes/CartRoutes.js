import express from "express";
import { getCart, addToCart } from "../controllers/CartController.js";
import ProtectMiddleware from "../middlewares/ProtectMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(ProtectMiddleware, getCart)
  .post(ProtectMiddleware, addToCart);

export default router;
