module.exports = (sequelize, DataTypes) =>{
  const Student = sequelize.define('Students', {
      student_code: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING
      },
      first_name: {
        type: DataTypes.STRING
      },
      cin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING
      },
      phone_number: {
        type: DataTypes.STRING
      },
      course:{
        type: DataTypes.STRING
      },
      level:{
        type: DataTypes.STRING
      },
      birth_place : {
        type: DataTypes.STRING,
        allowNull: false
      },
      birth_date : {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
  },{
    timestamps: false
  });

  return Student

}
