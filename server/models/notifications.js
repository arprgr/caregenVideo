'use strict';
module.exports = function(sequelize, DataTypes) {
    var Notifications = sequelize.define('Notifications', {
        senderEmailId: { 
        type : DataTypes.STRING,
        },
        senderName: { 
        type : DataTypes.STRING,
        },
        receiverEmailId: { 
        type : DataTypes.STRING,
        },
        receiverName: { 
        type : DataTypes.STRING,
        },
        notificationType: { 
        type : DataTypes.STRING,
        },
        notificationMeta1: { 
        type : DataTypes.STRING,
        },
         notificationMeta2: { 
        type : DataTypes.STRING,
        },
        notificationMeta3: { 
        type : DataTypes.STRING,
        },
        status: { 
        type : DataTypes.STRING,
        },
        timeZone: { 
        type : DataTypes.STRING,
        },
        createdAt: DataTypes.DATE,
        deliverAt: { 
        type : DataTypes.STRING,
        },
        updatedAt: DataTypes.DATE,
    }, {
        timestamps: true,
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return Notifications;
};
