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
db.AnneeUniversitaire = require('./AnneeUniversitaire')(sequelize, DataTypes)
db.Semestre = require('./Semestre')(sequelize, DataTypes)

module.exports = (sequelize, DataTypes) =>{
    const AnneeUniversitaire_Semestre = sequelize.define('AnneeUniversitaire-Semestres', {
        anneeUniversitaireId: {
            type: DataTypes.INTEGER,
            references: {
                model: db.AnneeUniversitaire, 
                key: 'id_anneeUniversitaire'
              }
          },

          semestreId: {
            type: DataTypes.INTEGER,
            references: {
                model: db.Semestre, 
                key: 'id_semestre'
              }
          }
    })
    return AnneeUniversitaire_Semestre
  
  }