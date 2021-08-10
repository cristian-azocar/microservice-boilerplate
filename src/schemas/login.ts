import Joi, { Schema } from '@hapi/joi';

const schema: Schema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export default schema;
