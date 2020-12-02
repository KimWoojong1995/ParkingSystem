const Sequelize = require('sequelize');

module.exports = class ParkingRecord extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      carNumber: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      ticket: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'local',
      },
      payment: {
          type: Sequelize.BOOLEAN,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'ParkingRecord',
      tableName: 'parkingRecords',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.ParkingRecord.belongsTo(db.Member, {
      foreignKey: 'followingId',
      as: 'Followers',
      through: 'Follow',
    });
  }
};