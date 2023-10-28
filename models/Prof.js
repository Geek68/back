module.exports = (sequelize, DataTypes) =>{
    const Prof = sequelize.define('Profs', {
        code_prof: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
       
        titre:{
            type: DataTypes.STRING,
            allowNull: true,
        },

        photo_prof:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        fonction:{
            type: DataTypes.STRING,
            allowNull: false,
        }
      
      
    },
    // {
    //     indexes: [{
    //         unique: true,
    //         fields: ['firstname', 'lastname'] // you can use multiple columns as well here
    //     }]
    // },
    );
    return Prof
  
  }