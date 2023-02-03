const Sequelize = require('sequelize');
const db = require('../db');

const Student = db.define('students', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date_of_birth: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

module.exports = Student;
