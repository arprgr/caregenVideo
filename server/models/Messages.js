'use strict';
module.exports = function(sequelize, DataTypes) {
    var Messages = sequelize.define('Messages', {
        senderEmailId: { 
        type : DataTypes.STRING,
        },
        receiverEmailId: { 
        type : DataTypes.STRING,
        },
        messageType: { 
        type : DataTypes.STRING,
        },
        vMessageURL: { 
        type : DataTypes.STRING,
        },
         vMessagePublicId: { 
        type : DataTypes.STRING,
        },
        status: { 
        type : DataTypes.STRING,
        },
        location: { 
        type : DataTypes.STRING,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        vMessageThumb: { 
        type : DataTypes.STRING,
        }
        
    }, {
        timestamps: true,
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return Messages;
};
