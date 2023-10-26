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
      
    },
    // {
    //     indexes: [{
    //         unique: true,
    //         fields: ['firstname', 'lastname'] // you can use multiple columns as well here
    //     }]
    // },
    {
        timestamps: false
    });
    return Prof
  
  }