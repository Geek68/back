module.exports = (sequelize, DataTypes) =>{
    const EC = sequelize.define('EC', {
        code_element: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
        nom_element:{
            type: DataTypes.STRING,
            allowNull : false,
        }
    })
    return EC
  
  }