module.exports = (sequelize, DataTypes) =>{
  const Student = sequelize.define('Students', {
      student_code: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      profile_pic: {
        type : DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      firstname: {
        type: DataTypes.STRING
      },
      cin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING
      },
      phone: {
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
