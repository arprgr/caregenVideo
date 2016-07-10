'use strict';
module.exports = function(sequelize, DataTypes) {
    var UserInvitations = sequelize.define('UserInvitations', {
        receiverEmailid: { 
        type : DataTypes.STRING,
        },
        emailid: { 
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
    return UserInvitations;
};

