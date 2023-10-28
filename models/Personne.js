module.exports = (sequelize, DataTypes) =>{
    const Personne = sequelize.define('Personnes', {
        id_personne: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
  
        nom: {
          type: DataTypes.STRING,
          allowNull: false,
        },
  
        prenoms: {
          type: DataTypes.STRING,
          allowNull: true,
        },
 
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            email: true
          },

          telephone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
          },

    });
  
    return Personne
  
  }
  