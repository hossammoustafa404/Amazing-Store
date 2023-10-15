import * as express from "express";
import {
  createCartItem,
  deleteCartItem,
  updateCartItem,
} from "../controllers/cart_items";

const router = express.Router({ mergeParams: true });

router.route("/").post(createCartItem);
router.route("/:cartItemId").patch(updateCartItem).delete(deleteCartItem);

export default router;
