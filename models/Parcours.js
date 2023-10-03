module.exports = (sequelize, DataTypes) =>{
    const Parcours = sequelize.define('Parcours', {
        code_parcours : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
        designation:{
            type: DataTypes.STRING,
            allowNull : false,
        }
    })
    return Parcours
  
  }