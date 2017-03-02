'use strict';
module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define('Users', {
        emailid:  { 
        type : DataTypes.STRING,
        },
        name: DataTypes.STRING,
        fbid: DataTypes.STRING,
        usertype: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        timestamps: false,
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return Users;
};
