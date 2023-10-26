module.exports = (sequelize, DataTypes) =>{
    const Groupe = sequelize.define('Groupes', {
        id_groupe: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
        nom_groupe:{
            type: DataTypes.STRING,
            allowNull : false,
        }
    })
    return Groupe
  
  }