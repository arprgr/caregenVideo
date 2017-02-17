'use strict';
module.exports = function(sequelize, DataTypes) {
    var fbusersdata = sequelize.define('fbusersdata', {
        fbid:  { 
        type : DataTypes.STRING,
        primaryKey : true 
        },
        fbemailid:  { 
        type : DataTypes.STRING
        },
        fbname:  { 
        type : DataTypes.STRING
        },
        profilepic: DataTypes.STRING,
        birthday: DataTypes.DATE,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,

    }, {
        timestamps: true,
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return fbusersdata;
};
