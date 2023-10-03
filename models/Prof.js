module.exports = (sequelize, DataTypes) =>{
    const Prof = sequelize.define('Profs', {
        firstname:{
            type: DataTypes.STRING,
        },
        lastname:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        title:{
            type: DataTypes.STRING,
        },
        phone:{
            type: DataTypes.STRING,
            unique: true,
        },
    })
    return Prof
  
  }