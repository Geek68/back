module.exports = (sequelize, DataTypes) =>{
    const Prof = sequelize.define('Profs', {
        firstname:{
            type: DataTypes.STRING,
        },
        lastname:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        title:{
            type: DataTypes.STRING,
        },
        profil_pic_path:{
            type: DataTypes.STRING,
        },
        email:{
            type: DataTypes.STRING,
            unique: true,
        },
        phone:{
            type: DataTypes.STRING,
            unique: true,
        },
    },{
        indexes: [{
            unique: true,
            fields: ['firstname', 'lastname'] // you can use multiple columns as well here
        }]
    });
    return Prof
  
  }