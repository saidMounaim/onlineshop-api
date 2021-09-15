import express from "express";
import { getCart } from "../controllers/CartController.js";
import ProtectMiddleware from "../middlewares/ProtectMiddleware.js";

const router = express.Router();

router.route("/").get(ProtectMiddleware, getCart);

export default router;
