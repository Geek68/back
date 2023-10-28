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
      date_naissance: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    
    lieu_naissance: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cin: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },

      date_delivranceCIN: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      lieu_delivranceCIN: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      situation_matrimoniale: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      
  });

  return Etudiant

}
