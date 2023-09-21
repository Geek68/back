const {Sequelize, DataTypes} = require('sequelize')
const config = require('../config/db.config')

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
)

sequelize.authenticate()
.then(()=> console.log('Connected To DB'))
.catch(err => console.error(err))

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.Student = require('./Student')(sequelize, DataTypes)
db.UserAccount = require('./UserAccount')(sequelize, DataTypes)
db.Prof = require('./Prof')(sequelize, DataTypes)


//ASSOCIATION
db.Prof.hasOne(db.UserAccount,{
    foreignKey: 'ProfId', targetKey: 'id'
})
db.UserAccount.belongsTo(db.Prof,{
    foreignKey: 'ProfId', targetKey: 'id'
})

module.exports = db
