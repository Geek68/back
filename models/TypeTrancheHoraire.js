module.exports = (sequelize, DataTypes) =>{
    const TypeTrancheHoraire = sequelize.define('TypeTrancheHoraires', {
        id_typetranchehoraire: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },

        typetranchehoraire_libelle :{
            type: DataTypes.STRING,
            allowNull: false
        }

    })
    return TypeTrancheHoraire
  
  }