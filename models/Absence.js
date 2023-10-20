const {Sequelize, DataTypes} = require('sequelize')
const config = require('../config/db.config')

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
)

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Student = require('./Student')(sequelize, DataTypes)
db.Seance = require('./Seance')(sequelize, DataTypes)

module.exports = (sequelize, DataTypes) =>{
    const Absence = sequelize.define('Absences', {
        studentId: {
            type: DataTypes.INTEGER,
            references: {
                model: db.Student, 
                key: 'student_code'
              }
          },
        seanceId :{
            type: DataTypes.INTEGER,
            references: {
                model: db.Seance, 
                key: 'code_seance'
              }
        }
    })
    return Absence
  
  }