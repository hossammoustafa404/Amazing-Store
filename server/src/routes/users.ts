// Imports
import * as express from "express";
import {
  createUser,
  deleteUser,
  getManyUsers,
  getUser,
  updateUser,
} from "../controllers/users";
import validate from "../middlewares/validate";
import {
  createUserValidator,
  deleteUserValidator,
  getUserValidator,
  updateUserValidator,
} from "../validators/users";
import addressesRouter from "./addresses";
import cartsRouter from "./carts";
import restrictedTo from "../middlewares/restrictedTo";
import protect from "../middlewares/protect";
import uploadSingleFile from "../middlewares/uploadSingleFile";

const router = express.Router();

// Nested Routes
router.use("/:userId/addresses", addressesRouter);
router.use("/:userId/cart", cartsRouter);

router
  .route("/")
  .post(
    validate(createUserValidator),
    protect(),
    restrictedTo("super_admin"),
    createUser
  )
  .get(getManyUsers);

router
  .route("/:userId")
  .get(validate(getUserValidator), getUser)
  .patch(
    protect(),
    uploadSingleFile("avatar", { limits: { fileSize: 1 * 1024 * 1024 } }),
    validate(updateUserValidator),
    updateUser
  )
  .delete(
    validate(deleteUserValidator),
    protect(),
    restrictedTo("super_admin"),
    deleteUser
  );

export default router;
