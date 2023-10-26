module.exports = (sequelize, DataTypes) =>{
    const Semestre = sequelize.define('Semestres', {
        id_semestre: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
        semestre_libelle :{
            type: DataTypes.STRING,
            allowNull : false,
        }
    })
    return Semestre
  
  }