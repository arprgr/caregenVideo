'use strict';
module.exports = function(sequelize, DataTypes) {
    var Videos = sequelize.define('Videos', {
        vid: { 
        type : DataTypes.STRING,
        primaryKey : true     
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
    return Videos;
};
