module.exports = (sequelize, DataTypes) =>{
    const UserAccount = sequelize.define('UserAccounts', {
        login: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
    })
    return UserAccount
  
  }