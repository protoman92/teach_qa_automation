import defaultJoi from "joi";
import { User } from "../interface";

const joi = defaultJoi.defaults((schema) => {
  return schema.options({
    abortEarly: false,
  });
});

export const createUserValidator = joi.object<User, true>({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().required().email(),
});
