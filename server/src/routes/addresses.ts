import * as express from "express";
import {
  createAddress,
  getAddress,
  getManyAddresses,
  updateUserAddress,
} from "../controllers/addresses";
import validate from "../middlewares/validate";
import {
  createAddressValidator,
  getAddressValidator,
  getManyAddressesValidator,
} from "../validators/addresses";
import protect from "../middlewares/protect";

const router = express.Router();

router
  .route("/")
  .post(protect(), validate(createAddressValidator), createAddress)
  .get(validate(getManyAddressesValidator), getManyAddresses);
router
  .route("/:addressId")
  .get(validate(getAddressValidator), getAddress)
  .patch(protect(), updateUserAddress);

export default router;
