const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  age: Joi.number().min(5).max(50).required(),

  email: Joi.string().email().required(),

  gender: Joi.string().valid("M","F"),

  password: Joi.string().min(8).required(),

  confirm_password: Joi.ref("password"),
 
})
 
const loginSchema = Joi.object({
    email : Joi.string().email().required(),

    password: Joi.string().min(8).required(),
})

const listSchema = Joi.object({
  title : Joi.string().max(30),

  body: Joi.string().max(60)
})

module.exports = {
  registerSchema,
  loginSchema,
  listSchema
};
