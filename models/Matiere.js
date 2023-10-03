module.exports = (sequelize, DataTypes) =>{
    const Matiere = sequelize.define('Matieres', {
        code_matiere: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
        designation:{
            type: DataTypes.STRING,
            allowNull : false,
        }
    })
    return Matiere
  
  }