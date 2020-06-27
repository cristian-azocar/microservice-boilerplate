import { Context, Next } from 'koa';
import ValidatorMiddleware from 'src/middlewares/validator';
import Joi from '@hapi/joi';

function ValidatorMiddlewareMock(): Partial<ValidatorMiddleware> {
  return {
    validate: (schema: Joi.Schema) => {
      return async (ctx: Context, next: Next): Promise<void> => {
        const { body } = ctx.request;

        // console.log(schema.describe());
        if (!body) {
          ctx.throw(400, 'Bad Request');
        }

        const schemaRules: Joi.Description = schema.describe();
        Object.keys(schemaRules.keys).forEach((key) => {
          if (typeof body[key] !== schemaRules.keys[key].type) {
            ctx.throw(400, 'Bad Request');
          }
        });

        if (!body || !body.username || !body.password) {
          ctx.throw(400, 'Bad Request');
        }

        await next();
      };
    },
  };
}

jest.mock('src/middlewares/validator', () => ValidatorMiddlewareMock);
