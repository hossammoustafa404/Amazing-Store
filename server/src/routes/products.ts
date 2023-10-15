import * as express from "express";
import {
  createProduct,
  deleteProduct,
  getManyProducts,
  getProduct,
  updateProduct,
} from "../controllers/products";
import validate from "../middlewares/validate";
import {
  createProductValidator,
  deleteProductValidator,
  getManyProductsValidator,
  getProductValidator,
  updateProductValidator,
} from "../validators/products";
import protect from "../middlewares/protect";
import restrictedTo from "../middlewares/restrictedTo";
import uploadMultiFiles from "../middlewares/uploadMultiFiles";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(
    protect(),
    restrictedTo("super_admin", "admin"),
    uploadMultiFiles("images", {
      limits: { fileSize: 1 * 1024 * 1024 },
    }),
    validate(createProductValidator),
    createProduct
  )
  .get(validate(getManyProductsValidator), getManyProducts);

router
  .route("/:productId")
  .get(validate(getProductValidator), getProduct)
  .patch(
    protect(),
    restrictedTo("super_admin", "admin"),
    validate(updateProductValidator),
    updateProduct
  )
  .delete(
    protect(),
    restrictedTo("super_admin", "admin"),
    validate(deleteProductValidator),
    deleteProduct
  );

export default router;
