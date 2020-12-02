const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const Member = require('./member');
const ParkingRecord = require('./parkingRecord');
const Admin = require('./admin');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Member = Member;
db.ParkingRecord = ParkingRecord;
db.Admin = Admin;

Member.init(sequelize);
ParkingRecord.init(sequelize);
Admin.init(sequelize);

Member.associate(db);
ParkingRecord.associate(db);
Admin.associate(db);

module.exports = db;