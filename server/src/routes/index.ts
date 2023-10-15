import * as express from "express";
import usersRouter from "./users";
import authRouter from "./auth";
import addressesRouter from "./addresses";
import countriesRouter from "./countries";
import categoriesRouter from "./categories";
import productsRouter from "./products";
import cartItemsRouter from "./cart_items";
import cartsRouter from "./carts";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/addresses", addressesRouter);
router.use("/countries", countriesRouter);
router.use("/categories", categoriesRouter);
router.use("/products", productsRouter);
router.use("/cart", cartsRouter);
router.use("/cart_items", cartItemsRouter);

export default router;
