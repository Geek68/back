module.exports = (sequelize, DataTypes) =>{
    const AnneeUniversitaire = sequelize.define('AnneUniversitaires', {
        id_anneeUniversitaire: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
        annee_debut:{
            type: DataTypes.DATEONLY,
            allowNull : false,
        },
        annee_fin:{
            type: DataTypes.DATEONLY,
            allowNull : false,
        },
        
    })
    return AnneeUniversitaire
  
  }