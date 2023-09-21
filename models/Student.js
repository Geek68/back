const {Sequelize, DataTypes} = require('sequelize')
const db = require('../config/db')

const Student = db.define('student', {
  student_code: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  cin: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true

  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true

  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  course:{
    type: DataTypes.STRING,
    allowNull: false
  },
  level:{
    type: DataTypes.STRING
  },
  birth_place : {
    type: DataTypes.STRING,
    allowNull: false
  },
  birth_date : {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  
  
}, {
  timestamps: false
});

Student.sync({alter: true}).then(() => {
  console.log('Table created');
});
module.exports = Student;