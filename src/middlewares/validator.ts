import { Context, Next, Middleware } from 'koa';
import { Schema } from '@hapi/joi';

export default class ValidatorMiddleware {
  validate(schema: Schema): Middleware {
    return async (ctx: Context, next: Next): Promise<void> => {
      const { error } = schema.validate(ctx.request.body);

      if (error) {
        ctx.throw(400, error.message);
      }

      await next();
    };
  }
}
