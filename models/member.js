const Sequelize = require('sequelize');

module.exports = class Member extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      carNumber: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      provider: {
          type: Sequelize.STRING(10),
          allowNull: false,
          defaultValue: 'local',
      },
      ticket: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      snsId: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Member',
      tableName: 'members',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Member.hasMany(db.ParkingRecord);
  }
};