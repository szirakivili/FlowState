const Todo = require("../models/Todo");

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ owner: req.user._id });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!todo) return res.status(404).json({ message: "Todo nem található" });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const todo = await Todo.create({ ...req.body, owner: req.user._id });
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true, runValidators: true },
    );
    if (!todo) return res.status(404).json({ message: "Todo nem található" });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!todo) return res.status(404).json({ message: "Todo nem található" });
    res.json({ message: "Todo törölve" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
