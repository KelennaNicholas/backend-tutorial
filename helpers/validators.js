const Joi = require("joi");

const registerSchema = Joi.object({
  
  name: Joi.string().min(3).max(30).required(),


  email: Joi.string().email().required(),


  password: Joi.string().min(8).required(),

  confirm_password: Joi.ref("password"),
 
})
 
const loginSchema = Joi.object({
    email : Joi.string().email().required(),

    password: Joi.string().min(8).required(),
})

const listSchema = Joi.object({
  title : Joi.string().max(30),

  body: Joi.string().max(60),

  time: Joi.date()
})

module.exports = {
  registerSchema,
  loginSchema,
  listSchema
};
