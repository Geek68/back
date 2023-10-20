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
db.Seance = require('./Seance')(sequelize, DataTypes)
db.Matiere = require('./Matiere')(sequelize, DataTypes)
db.Niveau = require('./Level')(sequelize, DataTypes)
db.Parcours = require('./Parcours')(sequelize, DataTypes)
db.Salle = require('./Salle')(sequelize, DataTypes)
db.Absence = require('./Absence')(sequelize, DataTypes)


// const Absence = sequelize.define('Absences', {
//     code_etudiant: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: db.Student, 
//             key: 'student_code'
//           }
//       },
//     code_seance :{
//         type: DataTypes.INTEGER,
//         references: {
//             model: db.Seance, 
//             key: 'code_seance'
//           }
//     }
// })


//ASSOCIATIONS
db.Prof.hasOne(db.UserAccount,{
    foreignKey: 'profId', targetKey: 'id'
})
db.UserAccount.belongsTo(db.Prof,{
    foreignKey: 'profId', targetKey: 'id'
})

db.Seance.belongsToMany(db.Student, {through: db.Absence, foreignKey: 'seanceId'})
db.Student.belongsToMany(db.Seance, {through: db.Absence, foreignKey: 'studentId'})


db.Parcours.hasMany(db.Niveau,{
    foreignKey: 'parcoursId', targetKey: 'code_parcours'
})
db.Niveau.belongsTo(db.Parcours,{
    foreignKey: 'parcoursId', targetKey: 'code_parcours'
})

db.Salle.hasMany(db.Seance,{
    foreignKey: 'salleId', targetKey: 'code_salle'
})
db.Seance.belongsTo(db.Salle,{
    foreignKey: 'salleId', targetKey: 'code_salle'
})

db.Niveau.hasMany(db.Matiere,{
    foreignKey: 'niveauId', targetKey: 'code_niveau'
})
db.Matiere.belongsTo(db.Niveau,{
    foreignKey: 'niveauId', targetKey: 'code_niveau'
})

// db.Seance.hasMany(db.Student,{
//     foreignKey: 'seanceId', targetKey: 'code_seance'
// })
// db.Student.belongsTo(db.Seance,{
//     foreignKey: 'seanceId', targetKey: 'code_seance'
// })

db.Seance.hasOne(db.Matiere,{
    foreignKey: 'seanceId', targetKey: 'code_seance'
})

db.Matiere.belongsTo(db.Seance,{
    foreignKey: 'seanceId', targetKey: 'code_seance'
})

db.Prof.hasMany(db.Matiere,{
    foreignKey: 'profId', targetKey: 'id'
})

db.Matiere.belongsTo(db.Prof,{
    foreignKey: 'profId', targetKey: 'id'
})

db.Prof.hasMany(db.Seance,{
    foreignKey: 'profId', targetKey: 'id'
})

db.Seance.belongsTo(db.Prof,{
    foreignKey: 'profId', targetKey: 'id'
})



db.Niveau.hasMany(db.Student,{
    foreignKey: 'niveauId', targetKey: 'code_niveau'
})

db.Student.belongsTo(db.Niveau,{
    foreignKey: 'niveauId', targetKey: 'code_niveau'
})


module.exports = db
