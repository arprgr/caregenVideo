'use strict';
module.exports = function(sequelize, DataTypes) {
    var Reminders = sequelize.define('Reminders', {
        senderEmailId: { 
        type : DataTypes.STRING,
        },
        vid: { 
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
        timeZone: { 
        type : DataTypes.STRING,
        },
        Repeat: { 
        type : DataTypes.STRING,
        },
        Expired: { 
        type : DataTypes.STRING,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deliverAt: { 
        type : DataTypes.STRING,
        },
        lastDeliveredAt: { 
        type : DataTypes.STRING,
        },
        fromuserid: { 
        type : DataTypes.INTEGER,
        },
        touserid: { 
        type : DataTypes.INTEGER,
        },
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
    
    
    return Reminders;
};
