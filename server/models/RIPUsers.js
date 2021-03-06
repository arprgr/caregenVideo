'use strict';
module.exports = function(sequelize, DataTypes) {
    var RIPUsers = sequelize.define('RIPUsers', {
        emailid: { 
        type : DataTypes.STRING,
        primaryKey : true
        },
        status: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
        
    }, {
        timestamps: true,
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return RIPUsers;
};
