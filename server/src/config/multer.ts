import * as multer from "multer";
import { v4 as uuid } from "uuid";

/**
 * Multer Storage configuration
 */
export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, uuid() + "_" + file.originalname);
  },
});
