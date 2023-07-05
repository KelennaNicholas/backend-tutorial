const List = require("../models/List");
const User = require ("../models/User")

// Creating a new to do item
const newToDo = async (req, res, next) => {
  try {
    console.log(req.body);
    const { user, title, body } = req.body;

    const toDo = await new List({
      user: user,
      title: title,
      body: body,
      user: req.user.id
    });

    await toDo.save();

    return res.status(201).json({
      success: true,
      message: "Added to To Do List successfully",
      toDo: toDo,
    });
  } catch {}
};

// Getting a single to do item
const getToDo = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id.length !== 24)
      return res.status(400).json({
        success: false,
        message: "Invalid id",
      });
    const toDo = await List.findById(id);

    if (!toDo)
      return res.status(404).json({
        success: false,
        message: "This item could not be found in your list",
      });
    return res.status(200).json({
      message: "To-Do fetched successfully",
      toDo: toDo,
    });
  } catch (err) {
    console.log(err.message);
  }
};

// Getting all to do items
const getAllToDo = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const usePage = page - 1;
    if (usePage == 0)
      return res.status(400).json({
        success: false,
        message: "Invalid page",
      });
    const todos = await List.find()
      .skip(usePage * limit)
      .limit(limit);
    return res.status(200).json({
      success: true,
      message: "To dos fetched successfully",
      todos: todos,
    });
  } catch (err) {
    console.log(err.message);
  }
};

// Deleting a to do item
const deleteToDo = async (req, res) => {
  try {
    let { id } = req.params;
    if (id.length !== 24)
      return res.status(400).json({
        success: false,
        message: "Invalid id",
      });
    // const userId = new mongoose.Types.ObjectId(id)
    const toDo = await List.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Item deleted successfully",
      success: true,
      toDo: toDo,
    });
  } catch (err) {
    console.log(err);
  }
};

// Update a to do item
const updateToDo = async (req, res, next) => {
  try {
    let { id } = req.params;
    if (id.length !== 24)
      return res.status(400).json({
        success: false,
        message: "Invalid id",
      });

    const toDo = await List.findByIdAndUpdate(id, req.body, { new: true });

    return res.status(200).json({
      message: "To do item updated successfully",
      success: true,
      List: toDo,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  newToDo,
  getToDo,
  getAllToDo,
  deleteToDo,
  updateToDo,
};
