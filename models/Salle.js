module.exports = (sequelize, DataTypes) =>{
    const Salle = sequelize.define('Salles', {
        code_salle: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
        numero_salle:{
            type: DataTypes.STRING,
            allowNull : false,
        },
        localisation:{
          type: DataTypes.STRING,
          allowNull : false,
      },
      capacite_salle:{
        type: DataTypes.INTEGER,
    },
        
    })
    return Salle
  
  }