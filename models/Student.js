const Sequelize = require('sequelize');
const db = require('../config/db');

const Student = db.define('student', {
  student_code: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  },
  first_name: {
    type: Sequelize.STRING
  },
  cin: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  phone_number: {
    type: Sequelize.STRING
  },
  course:{
    type: Sequelize.STRING
  },
  level:{
    type: Sequelize.STRING
  },
  
  
});

Student.sync().then(() => {
  console.log('Table created');
});
module.exports = Student;