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
db.Etudiant = require('./Etudiant')(sequelize, DataTypes)
db.AnneeUniversitaire = require('./AnneeUniversitaire')(sequelize, DataTypes)
db.Niveau = require('./Niveau')(sequelize, DataTypes)

module.exports = (sequelize, DataTypes) =>{
    const Inscrit = sequelize.define('Inscrits', {
      id_inscrit: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement : true

      },

        etudiantId: {
            type: DataTypes.INTEGER,

          },
          niveauId: {
            type: DataTypes.INTEGER,


          },
        anneeUniversitaireId :{
            type: DataTypes.INTEGER,

        },

        code_redoublement: {
            type: DataTypes.STRING,
            allowNull: false
          },

        photo_etudiant: {
            type: DataTypes.STRING,
            allowNull: true
          }
    })
    return Inscrit
  
  }