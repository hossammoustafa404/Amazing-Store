import type { Request } from "express";
import { BadRequestError } from "./errors";

const fileFilter = (types: string[]) => (req: Request, file: any, cb: any) => {
  const currType = file.originalname.split(".").slice(-1)[0];
  if (!types.includes(currType)) {
    return cb(new BadRequestError(`${currType} is not allowed`), false);
  }

  cb(null, true);
};

export default fileFilter;
