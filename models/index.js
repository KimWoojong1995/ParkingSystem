const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const Member = require('./member');
const ParkingRecord = require('./parkingRecord');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Member = Member;
db.ParkingRecord = ParkingRecord;

Member.init(sequelize);
ParkingRecord.init(sequelize);

Member.associate(db);
ParkingRecord.associate(db);

module.exports = db;