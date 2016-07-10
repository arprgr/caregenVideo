'use strict';
module.exports = function(sequelize, DataTypes) {
    var Invitations = sequelize.define('Invitations', {
        senderEmailid: { 
        type : DataTypes.STRING
        },
        receiverEmailid: { 
        type : DataTypes.STRING,
        },
        message: DataTypes.STRING,
        status: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
        
    }, {
        timestamps: true,
        classMethods: {
            associate: function(models) {
                // associations can be defined heres
            }
        }
    });
    return Invitations;
};
