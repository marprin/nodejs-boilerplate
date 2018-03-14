'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    underscored: true,
    timestamps: true,
    paranoid: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};