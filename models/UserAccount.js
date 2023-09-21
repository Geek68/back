module.exports = (sequelize, DataTypes) =>{
    const UserAccount = sequelize.define('UserAccounts', {
        login: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
    })
    return UserAccount
  
  }