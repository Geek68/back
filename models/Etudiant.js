module.exports = (sequelize, DataTypes) =>{
  const Etudiant = sequelize.define('Etudiants', {
      numero_inscription: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      nationalite: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      numero_passport: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      
  });

  return Etudiant

}
