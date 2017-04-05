'use strict';
module.exports = function(sequelize, DataTypes) {
  var Todo = sequelize.define('Todo', {
    title: {
      type:      DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Todo.hasMany(models.ToDoItems, {
          foreignKey: 'todoId',
          as:         'ToDoItems'
        })
      }
    }
  });
  return Todo;
};
