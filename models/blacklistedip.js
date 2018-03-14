'use strict';
module.exports = function(sequelize, DataTypes) {
  var BlackListedIp = sequelize.define('black_listed_ips', {
    ip_address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
  },
  }, {
    underscored: true,
    timestamps: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return BlackListedIp;
};