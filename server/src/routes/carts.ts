import * as express from "express";
import { getCart, deleteCart } from "../controllers/carts";
import cartItemsRouter from "./cart_items";

const router = express.Router({ mergeParams: true });

// Nested Route
router.use("/cart_items", cartItemsRouter);

router.route("/").get(getCart).delete(deleteCart);

export default router;
