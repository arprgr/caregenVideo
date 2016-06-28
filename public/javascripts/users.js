'use strict';
module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define('users', {
        id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        emailid: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return Users;
};