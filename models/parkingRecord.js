const Sequelize = require('sequelize');

module.exports = class ParkingRecord extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      carNumber: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      paid: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false,
      },
      inTime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      outTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'ParkingRecord',
      tableName: 'parkingRecords',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.ParkingRecord.belongsTo(db.Member, { foreignKey: 'member', targetKey: 'id' });
  }
};