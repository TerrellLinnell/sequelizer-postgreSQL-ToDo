'use strict';
module.exports = function(sequelize, DataTypes) {
  var ToDoItems = sequelize.define('ToDoItems', {
    content: {
      type:      DataTypes.STRING,
      allowNull: false
    },
    completed: {
      type:         DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        ToDoItems.belongsTo(models.Todo, {
          foreignKey: 'todoId',
          // when a Todo is deleted, all ToDoItems belonging to it are also deleted.
          onDelete:   'CASCADE'
        })
      }
    }
  });
  return ToDoItems;
};
