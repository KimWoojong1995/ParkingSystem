const Sequelize = require('sequelize');

module.exports = class Member extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      carNumber: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      ticket: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      admin: {
          type: Sequelize.BOOLEAN,
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
    db.Member.hasMany(db.ParkingRecord), { foreignKey: 'member', sourceKey: 'id' };
  }
};