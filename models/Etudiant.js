module.exports = (sequelize, DataTypes) =>{
  const Etudiant = sequelize.define('Etudiants', {
      id_etudiant: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      numero_inscription: {
        type: DataTypes.STRING,
        allowNull: false,
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
      },

      date_delivranceCIN: {
        type: DataTypes.DATEONLY,
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
      sexe: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
      adresse: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
  });

  return Etudiant

}
