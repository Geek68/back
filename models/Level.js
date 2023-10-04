module.exports = (sequelize, DataTypes) =>{
    const Level = sequelize.define('Levels', {
        code_niveau: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
        designation:{
            type: DataTypes.STRING,
            allowNull : false,
        },
        
    })
    return Level
  
  }