import * as express from "express";
import {
  createCategory,
  deleteCategory,
  getCategory,
  getManyCategories,
  updateCategory,
} from "../controllers/categories";
import validate from "../middlewares/validate";
import {
  createCategoryValidator,
  deleteCategoryValidator,
  getCatregoryValidator,
  getManyCategoriesValidator,
  updateCategoryValidator,
} from "../validators/categories";
import restrictedTo from "../middlewares/restrictedTo";
import protect from "../middlewares/protect";
import productsRouter from "./products";

const router = express.Router();

// Nested Routes
router.use("/:categoryId/products", productsRouter);

router
  .route("/")
  .post(
    protect(),
    restrictedTo("super_admin"),
    validate(createCategoryValidator),
    createCategory
  )
  .get(validate(getManyCategoriesValidator), getManyCategories);

router
  .route("/:categoryId")
  .get(validate(getCatregoryValidator), getCategory)
  .patch(
    protect(),
    restrictedTo("super_admin"),
    validate(updateCategoryValidator),
    updateCategory
  )
  .delete(
    protect(),
    restrictedTo("super_admin"),
    validate(deleteCategoryValidator),
    deleteCategory
  );

export default router;
