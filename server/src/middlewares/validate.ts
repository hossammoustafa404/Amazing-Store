import type { Request, Response, NextFunction } from "express";
import pick from "../lib/pick";
import * as Joi from "joi";
import { BadRequestError } from "../lib/errors";

const validate =
  (validator: any) => (req: Request, res: Response, next: NextFunction) => {
    const toPick: string[] = Object.keys(validator);
    const toValidate: any = pick(toPick, req);

    const validSchema = Joi.compile(validator);
    const { error } = validSchema.validate(toValidate, { abortEarly: false });

    if (error) {
      throw new BadRequestError(error.message);
    }

    next();
  };

export default validate;
