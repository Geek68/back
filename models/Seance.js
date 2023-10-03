module.exports = (sequelize, DataTypes) =>{
    const Seance = sequelize.define('Seances', {
        code_seance: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
        date_seance :{
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    })
    return Seance
  
  }