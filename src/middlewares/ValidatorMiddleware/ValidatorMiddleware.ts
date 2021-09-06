import { Request, Response, NextFunction } from 'express';
import { Schema } from '@hapi/joi';
import BadRequestError from '../../errors/BadRequestError';

type Middleware = (req: Request, res: Response, next: NextFunction) => void;

export default class ValidatorMiddleware {
  validate(schema: Schema): Middleware {
    return (req: Request, res: Response, next: NextFunction): void => {
      const { error } = schema.validate(req.body);

      if (error) {
        throw new BadRequestError(error.message);
      }

      next();
    };
  }
}
