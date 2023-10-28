module.exports = (sequelize, DataTypes) =>{
    const Personne = sequelize.define('Personnes', {
        id_personne: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
  
        nom: {
          type: DataTypes.STRING,
          allowNull: false,
        },
  
        prenoms: {
          type: DataTypes.STRING,
          allowNull: true,
        },

        date_naissance: {
            type: DataTypes.DATE,
            allowNull: false,
          },
        
        lieu_naissance: {
            type: DataTypes.STRING,
            allowNull: true,
          },

          sexe: {
            type: DataTypes.STRING,
            allowNull: false,
          },

          cin: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
          },

          date_delivranceCIN: {
            type: DataTypes.DATE,
            allowNull: false,
          },

          lieu_delivranceCIN: {
            type: DataTypes.STRING,
            allowNull: false,
          },

          email: {
            type: DataTypes.STRING,
            allowNull: false,
            email: true
          },

          telephone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
          },

          situation_matrimoniale: {
            type: DataTypes.STRING,
            allowNull: false,
          },

          adresse: {
            type: DataTypes.STRING,
            allowNull: false,
          },
    },{
      timestamps: false
    });
  
    return Personne
  
  }
  