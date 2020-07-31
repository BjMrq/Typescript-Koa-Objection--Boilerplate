import Joi from '@hapi/joi';
import { validateRequest } from 'globalMiddlewares';

export const loginSchema = validateRequest(Joi.object({
  email: Joi
    .string()
    .email()
    .required(),
  password: Joi
    .string()
    .required()
}));

export const logoutSchema = validateRequest(Joi.object({
  token: Joi
    .string()
    .required()
}));

export const logoutAllSchema = validateRequest(Joi.object({
}));

export const setPasswordSchema = validateRequest(Joi.object({
  password: Joi
    .string()
    .required()
}));

export const requestResetPasswordSchema = validateRequest(Joi.object({
  email: Joi
    .string()
    .email()
    .required()
}));

export const registerThirdPartySchema = validateRequest(Joi.object({
  user: Joi
    .object({
      name: Joi
        .string(),
      email: Joi
        .string()
        .email()
        .required(),
      profilePicture: Joi
        .string(),
      googleId: Joi
        .string()
    })
}));
