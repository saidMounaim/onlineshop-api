import express from "express";
import { getOrders } from "../controllers/OrderController.js";
import ProtectMiddleware from "../middlewares/ProtectMiddleware.js";

const router = express.Router();

router.route("/").get(ProtectMiddleware, getOrders);

export default router;
