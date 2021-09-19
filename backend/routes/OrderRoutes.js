import express from "express";
import {
  getOrders,
  addOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/OrderController.js";
import ProtectMiddleware from "../middlewares/ProtectMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(ProtectMiddleware, getOrders)
  .post(ProtectMiddleware, addOrder);

router
  .route("/:id")
  .put(ProtectMiddleware, updateOrder)
  .delete(ProtectMiddleware, deleteOrder);

export default router;
