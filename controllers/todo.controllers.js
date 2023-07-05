const Validator = require("../helpers/validators")
const {listSchema} = require("../helpers/validators")
const ListService = require("../services/list.services")
const Joi = require("joi")

const newtodo = async(req, res, next) =>{
    console.log(req.body)
    const {error} = await listSchema.validate(req.body)
    if(error){
      console.log(error)
      return res.status(400).json({
        success:false,
        error: error.details[0].message
      })
    }
    await ListService.newToDo(req ,res ,next)
  }
  const gettodo = async(req, res, next) =>{
    console.log(req.body)
    const {error} = await listSchema.validate(req.body)
    if(error){
      console.log(error)
      return res.status(400).json({
        success:false,
        error: error.details[0].message
      })
    }
    await ListService.getToDo(req ,res ,next)
  }
  const getalltodo = async(req, res, next) =>{
    console.log(req.body)
    const {error} = await listSchema.validate(req.body)
    if(error){
      console.log(error)
      return res.status(400).json({
        success:false,
        error: error.details[0].message
      })
    }
    await ListService.getAllToDo(req ,res ,next)
  }
  const deletetodo = async(req, res, next) =>{
    console.log(req.body)
    const {error} = await listSchema.validate(req.body)
    if(error){
      console.log(error)
      return res.status(400).json({
        success:false,
        error: error.details[0].message
      })
    }
    await ListService.deleteToDo(req ,res ,next)
  }
  const updatetodo = async(req, res, next) =>{
    console.log(req.body)
    const {error} = await listSchema.validate(req.body)
    if(error){
      console.log(error)
      return res.status(400).json({
        success:false,
        error: error.details[0].message
      })
    }
    await ListService.updateToDo(req ,res ,next)
  }

  module.exports = {
    newtodo,
    gettodo,
    getalltodo,
    deletetodo,
    updatetodo,
  };