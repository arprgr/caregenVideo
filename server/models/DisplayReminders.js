'use strict';

module.exports = function(sequelize, DataTypes) {
  var DisplayReminders;
  var models;

  function schema() {
    return {
      fromUserId: {
        type: DataTypes.INTEGER,
        unique: "indexConnectionsUserAndPeer"
      },
     toUserId: {
        type: DataTypes.INTEGER,
        unique: "indexConnectionsUserAndPeer"
      },    
      status: DataTypes.INTEGER,
    assetAssetId: {
        type: DataTypes.STRING,
        unique: "indexConnectionsAssets"
      },     
     status: {
        type: DataTypes.STRING,
      },    
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deliverAt: { 
        type : DataTypes.STRING,
      },
      timeZone: {
        type: DataTypes.STRING  
      }    
    }
  }

  function associate(_models) {
    models = _models;
    DisplayReminders.belongsTo(models.Users, { as: "fromUser" });
    DisplayReminders.belongsTo(models.Users, { as: "toUser" });  
    DisplayReminders.belongsTo(models.Assets, {as: "asset"});  
  }

  function builder() {
    var values = {
    };
    return {
      user: function(user) {
        values.userId = user.id;
        return this;
      },
      userId: function(userId) {
        values.userId = userId;
        return this;
      },
      peerId: function(peerId) {
        values.peerId = peerId;
        return this;
      },
      status: function(status) {
        values.status = status;
        return this;
      },
      build: function() {
        return Connection.create(values);
      }
    }
  }

  function destroyAll() {
    return DisplayReminders.destroy({ where: {} });
  }

  function destroyByUserAndPeerIds(fromUserId, toUserId) {
    return DisplayReminders.destroy({
      where: {
        fromUserId: fromUserId,
        toUserId: toUserId
      },
    })
  }

  function findByFromUserId(userId) {
    return DisplayReminders.findAll({
      where: { fromUserId: userId },
      include: [{
        model: models.User,
        as: "fromUser",
        required: true
      }],
      order: [ [ "status", "deliverAt" ] ]
    })
  }

  function findByToUserId(userId) {
    return DisplayReminders.findAll({
      where: { toUserId: userId },
      include: [{
        model: models.Users,
        as: "toUser",
        required: true
      },
      {
        model: models.Assets,
        as: "asset"  
      }],    
      order: [ [ "deliverAt", "ASC" ] ]
    })
  }
    

  function findByFromUserAndToUserIds(fromUserId, toUserId) {
    return DisplayReminders.findOne({
      where: {
        fromUserId: fromUserId,
        toUserId: toUserId
      },
    })
  }


  DisplayReminders = sequelize.define("DisplayReminders", schema(), {
    classMethods: {
      associate: associate,
      builder: builder,
      destroyAll: destroyAll,
      destroyByUserAndPeerIds: destroyByUserAndPeerIds,
      findByFromUserId: findByFromUserId,
      findByToUserId: findByToUserId,  
      findByFromUserAndToUserIds: findByFromUserAndToUserIds,
    }
  })

  DisplayReminders.STATUS_BROKEN = -1;
  DisplayReminders.STATUS_TENTATIVE = 0;
  DisplayReminders.STATUS_CONFIRMED = 1;

  return DisplayReminders;
};
