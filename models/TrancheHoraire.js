module.exports = (sequelize, DataTypes) =>{
    const TrancheHoraire = sequelize.define('TrancheHoraires', {
        code_tranchehoraire: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },

        date_trancheHoraire :{
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        heure_debut :{
          type: DataTypes.TIME,
          allowNull: false
      },
      
        heure_fin :{
          type: DataTypes.TIME,
          allowNull: false
    },

        isValider : {
          type: DataTypes.BOOLEAN,
          defaultValue : false
        }
    

    })
    return TrancheHoraire
  
  }