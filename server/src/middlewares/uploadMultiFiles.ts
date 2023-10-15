import * as multer from "multer";
import { storage } from "../config/multer";

const uploadMultiFiles = (
  fieldName: string,
  options: { limits: { fileSize: number }; fileFilter?: any }
) => multer({ storage, ...options }).array(fieldName);

export default uploadMultiFiles;
