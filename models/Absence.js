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
db.Student = require('./Etudiant')(sequelize, DataTypes)
db.Seance = require('./TrancheHoraire')(sequelize, DataTypes)

module.exports = (sequelize, DataTypes) =>{
    const Absence = sequelize.define('Absences', {
        tranchehoraireId: {
            type: DataTypes.INTEGER,
            references: {
                model: db.TrancheHoraire, 
                key: 'code_tranchehoraire'
              }
          },
        personneId :{
            type: DataTypes.INTEGER,
            references: {
                model: db.Personne, 
                key: 'id_personne'
              }
        }
    })
    return Absence
  
  }