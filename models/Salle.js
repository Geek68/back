module.exports = (sequelize, DataTypes) =>{
    const Salle = sequelize.define('Salles', {
        code_salle: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
        designation:{
            type: DataTypes.STRING,
            allowNull : false,
        }
    })
    return Salle
  
  }