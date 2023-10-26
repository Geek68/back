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
db.Groupe = require('./Groupe')(sequelize, DataTypes)
db.Personne = require('./Personne')(sequelize, DataTypes)

module.exports = (sequelize, DataTypes) =>{
    const Personne_Groupe = sequelize.define('Personne-Groupes', {
        personneId: {
            type: DataTypes.INTEGER,
            references: {
                model: db.Personne, 
                key: 'id_personne'
              }
          },

          groupeId: {
            type: DataTypes.INTEGER,
            references: {
                model: db.Groupe, 
                key: 'id_groupe'
              }
          }
    })
    return Personne_Groupe
  
  }