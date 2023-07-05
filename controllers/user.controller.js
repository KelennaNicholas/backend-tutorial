const Validator = require("../helpers/validators")
const {registerSchema} = require("../helpers/validators")
const {loginSchema} = require("../helpers/validators")
const Joi = require("joi")
const UserService = require("../services/user.services")


const registration = async(req, res, next) =>{
  console.log(req.body)
  const {error} = await registerSchema.validate(req.body)
  if(error){
    console.log(error)
    return res.status(400).json({
      success:false,
      error: error.details[0].message
    })
  }
  await UserService.register(req ,res ,next)
}

const login = async(req, res, next) =>{
  const {error} = await loginSchema.validate(req.body)
  if(error){
    console.log(error)
    return res.status(400).json({
      success:false,
      error: error.details[0].message
    })
  }
  
  await UserService.login(req, res, next)
}

module.exports ={
  registration,
  login
}