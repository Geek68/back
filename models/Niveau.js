module.exports = (sequelize, DataTypes) => {
  const Niveau = sequelize.define("Niveaux", {
    code_niveau: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    niveau_libelle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Niveau;
};
