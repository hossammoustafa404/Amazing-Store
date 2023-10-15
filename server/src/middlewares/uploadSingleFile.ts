import * as multer from "multer";
import { storage } from "../config/multer";

const uploadSingleFile = (
  fieldName: string,
  options?: { limits?: { fileSize: number }; fileFilter?: any }
) => multer({ storage, ...options }).single(fieldName);

export default uploadSingleFile;
