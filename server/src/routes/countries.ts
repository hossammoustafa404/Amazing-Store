import * as express from "express";
import validate from "../middlewares/validate";
import {
  UpdateCountryValidator,
  createCountryValidator,
} from "../validators/countries";
import {
  createCountry,
  getManyCountries,
  updateCountry,
} from "../controllers/countries";
import restrictedTo from "../middlewares/restrictedTo";
import protect from "../middlewares/protect";

const router = express.Router();

router
  .route("/")
  .post(
    protect(),
    restrictedTo("super_admin"),
    validate(createCountryValidator),
    createCountry
  )
  .get(getManyCountries);

router
  .route("/:countryId")
  .patch(
    protect(),
    restrictedTo("super_admin"),
    validate(UpdateCountryValidator),
    updateCountry
  );

export default router;
