'use strict';
module.exports = function(sequelize, DataTypes) {
    var Connections = sequelize.define('Connections', {
        primaryEmailid: { 
        type : DataTypes.STRING,
        },
        connectedToEmailid: { 
        type : DataTypes.STRING,
        },
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
    return Connections;
};
