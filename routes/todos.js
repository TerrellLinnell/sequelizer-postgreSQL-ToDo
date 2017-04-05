var express = require('express');
var Todo    = require('../models').Todo
var ToDoItems = require('../models').ToDoItems
var Router = new express.Router();

Router.use(function (req, res, next) {
  console.log("Using the express router");
  next();
})

Router.route('/todos')
  .get(function (req, res) {
    Todo.findAll({
      include: [{
        model: ToDoItems,
        as: 'ToDoItems'
      }]
    })
    .then(todos => {
      res.json({todos: todos});
    })
    .catch(error => {
      res.json({error: error});
    })
  })
  .post(function (req, res) {
    Todo.create({
      title: req.body.title
    })
    // Todo.create returns a promise - so use .then() and .catch() to handle that promise
    .then(todo => {
      res.json({todo: todo});
    })
    .catch(error => {
      res.json({error: error});
    })
  })

Router.route('/todos/:todoId')
  .get(function (req, res) {
    Todo.findById(req.params.todoId, {
      include: [{
        model: ToDoItems,
        as: 'ToDoItems'
      }]
    })
    .then(todo => {
      res.json({todo: todo})
    })
    .catch(error => {
      res.json({error: error})
    });
  })
  .put(function (req, res) {
    Todo.findById(req.params.todoId, {
      include: [{
        model: ToDoItems,
        as: 'ToDoItems'
      }]
    })
    .then(todo => {
      todo.update({
        title: req.body.title || todo.title,
      })
      .then(todo => {
        res.json({todo: todo})
      })
      .catch(error => {
        res.json({error: error})
      })
    })
    .catch(error => {
      res.json({error: error})
    })
  })
  .delete(function (req, res) {
    Todo.findById(req.params.todoId, {
      include: [{
        model: ToDoItems,
        as: 'ToDoItems'
      }]
    })
    .then(todo => {
      todo.destroy()
      .then(() => {
        res.json({message: 'The todo was deleted'})
      })
      .catch(error => {
        res.json({error: error})
      })
    })
    .catch(error => {
      res.json({error: error})
    })
  })


Router.route('/todos/:todoId/items')
  .post(function (req, res) {
    ToDoItems.create({
      content: req.body.content,
      todoId: req.params.todoId
    })
    .then(todoItem => {
      res.json({todoItem: todoItem});
    })
    .catch(error => {
      res.json({error: error});
    })
  })

Router.route('/todos/:todoId/items/:ToDoItemsId')
  .get(function (req, res) {
    ToDoItems.find({
      where: {
        id: req.params.ToDoItemsId,
        todoId: req.params.todoId
      }
    })
    .then(ToDoItems => {
      res.json({ToDoItems: ToDoItems})
    })
    .catch(error => {
      res.json({error: error})
    })
  })
  .put(function (req, res) {
    ToDoItems.find({
      where: {
        id: req.params.ToDoItemsId,
        todoId: req.params.todoId
      }
    })
    .then(ToDoItems => {
      ToDoItems.update({
        content:   req.body.content || ToDoItems.content,
        completed: req.body.completed === 'true' ? true: false
      })
      .then(ToDoItems => {
        res.json({ToDoItems: ToDoItems})
      })
      .catch(error => {
        res.json({error: error})
      })
    })
    .catch(error => {
      res.json({error: error})
    })
  })
  .delete(function (req, res) {
    ToDoItems.find({
      where: {
        id: req.params.ToDoItemsId,
        todoId: req.params.todoId
      }
    })
    .then(ToDoItems => {
      ToDoItems.destroy()
      .then(() => {
        res.json({message: 'The ToDoItem was deleted'})
      })
      .catch(error => {
        res.json({error: error})
      })
    })
    .catch(error => {
      res.json({error: error})
    })
  })

module.exports = Router;
