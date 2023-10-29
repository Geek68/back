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
        etudiantId: {
            type: DataTypes.INTEGER,
            primaryKey: true
          },
          niveauId: {
            type: DataTypes.INTEGER,
            primaryKey: true
          },
        anneeUniversitaireId :{
            type: DataTypes.INTEGER,
            primaryKey: true
        },

        code_redoublement: {
            type: DataTypes.STRING,
            allowNull: false
          },

        photo_etudiant: {
            type: DataTypes.STRING,
            allowNull: true
          },
    })
    return Inscrit
  
  }