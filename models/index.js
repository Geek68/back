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


db.Etudiant = require('./Etudiant')(sequelize, DataTypes)
db.UserAccount = require('./UserAccount')(sequelize, DataTypes)
db.Prof = require('./Prof')(sequelize, DataTypes)
db.TrancheHoraire = require('./TrancheHoraire')(sequelize, DataTypes)
db.EC = require('./EC')(sequelize, DataTypes)
db.Niveau = require('./Niveau')(sequelize, DataTypes)
db.Salle = require('./Salle')(sequelize, DataTypes)
db.Absence = require('./Absence')(sequelize, DataTypes)
db.Personne = require('./Personne')(sequelize, DataTypes)
db.AnneeUniversitaire = require('./AnneeUniversitaire')(sequelize, DataTypes)
db.TypeTrancheHoraire = require('./TypeTrancheHoraire')(sequelize, DataTypes)
db.Semestre = require('./Semestre')(sequelize, DataTypes)
db.Inscrit = require('./Inscrit')(sequelize, DataTypes)
db.Groupe = require('./Groupe')(sequelize, DataTypes)
db.Personne_Groupe = require('./Peronne_Groupe')(sequelize, DataTypes)
db.AnneeUniversitaire_Semestre = require('./AnneeUniversitaire_Semestre')(sequelize, DataTypes)







//ASSOCIATIONS
db.Prof.hasOne(db.UserAccount,{
    foreignKey: 'profId', targetKey: 'code_prof'
})
db.UserAccount.belongsTo(db.Prof,{
    foreignKey: 'profId', targetKey: 'code_prof'
})

db.TrancheHoraire.belongsToMany(db.Personne, {through: db.Absence, foreignKey: 'tranchehoraireId'})
db.Personne.belongsToMany(db.TrancheHoraire, {through: db.Absence, foreignKey: 'personneId'})

db.TrancheHoraire.hasMany(db.Absence, {
    foreignKey: 'tranchehoraireId', targetKey: 'code_tranchehoraire'
})
db.Absence.belongsTo(db.TrancheHoraire, {
    foreignKey: 'tranchehoraireId', targetKey: 'code_tranchehoraire'
})

db.Personne.hasMany(db.Absence, {
    foreignKey: 'personneId', targetKey: 'id_personne'
})
db.Absence.belongsTo(db.Personne, {
    foreignKey: 'personneId', targetKey: 'id_personne'
})

db.Etudiant.belongsToMany(db.Niveau, {through: db.Inscrit, foreignKey: 'etudiantId'})
db.Niveau.belongsToMany(db.Etudiant, {through: db.Inscrit, foreignKey: 'niveauId'})
db.Etudiant.belongsToMany(db.AnneeUniversitaire, {through: db.Inscrit, foreignKey: 'etudiantId'})
db.AnneeUniversitaire.belongsToMany(db.Etudiant, {through: db.Inscrit, foreignKey: 'anneeUniversitaireId'})
db.Niveau.belongsToMany(db.AnneeUniversitaire, {through: db.Inscrit, foreignKey: 'niveauId'})
db.AnneeUniversitaire.belongsToMany(db.Niveau, {through: db.Inscrit, foreignKey: 'anneeUniversitaireId'})




db.Salle.hasMany(db.TrancheHoraire,{
    foreignKey: 'salleId', targetKey: 'code_salle'
})
db.TrancheHoraire.belongsTo(db.Salle,{
    foreignKey: 'salleId', targetKey: 'code_salle'
})

db.Niveau.hasMany(db.EC,{
    foreignKey: 'niveauId', targetKey: 'code_niveau'
})
db.EC.belongsTo(db.Niveau,{
    foreignKey: 'niveauId', targetKey: 'code_niveau'
})


db.EC.hasMany(db.TrancheHoraire,{
    foreignKey: 'elementId', targetKey: 'code_element'
})

db.TrancheHoraire.belongsTo(db.EC,{
    foreignKey: 'elementId', targetKey: 'code_element'
})

db.Semestre.hasMany(db.TrancheHoraire,{
    foreignKey: 'semestreId', targetKey: 'id_semestre'
})

db.TrancheHoraire.belongsTo(db.Semestre,{
    foreignKey: 'semestreId', targetKey: 'id_semestre'
})


db.TypeTrancheHoraire.hasMany(db.TrancheHoraire,{
    foreignKey: 'typetranchehoraireId', targetKey: 'id_typetranchehoraire'
})

db.TrancheHoraire.belongsTo(db.TypeTrancheHoraire,{
    foreignKey: 'typetranchehoraireId', targetKey: 'id_typetranchehoraire'
})



db.Prof.hasMany(db.TrancheHoraire,{
    foreignKey: 'profId', targetKey: 'code_prof'
})

db.TrancheHoraire.belongsTo(db.Prof,{
    foreignKey: 'profId', targetKey: 'code_prof'
})



db.Niveau.hasMany(db.Etudiant,{
    foreignKey: 'niveauId', targetKey: 'code_niveau'
})

db.Etudiant.belongsTo(db.Niveau,{
    foreignKey: 'niveauId', targetKey: 'code_niveau'
})

db.Personne.hasMany(db.Etudiant,{
    foreignKey: 'personneId', targetKey: 'id_personne'
})

db.Etudiant.belongsTo(db.Personne,{
    foreignKey: 'personneId', targetKey: 'id_personne'
})


db.Personne.hasMany(db.Prof,{
    foreignKey: 'personneId', targetKey: 'id_personne'
})

db.Prof.belongsTo(db.Personne,{
    foreignKey: 'personneId', targetKey: 'id_personne'
})

db.Groupe.hasMany(db.TrancheHoraire,{
    foreignKey: 'groupeId', targetKey: 'id_groupe'
})

db.TrancheHoraire.belongsTo(db.Groupe,{
    foreignKey: 'groupeId', targetKey: 'id_groupe'
})

db.Personne.belongsToMany(db.Groupe, {through: db.Personne_Groupe, foreignKey: 'personneId'})
db.Groupe.belongsToMany(db.Personne, {through: db.Personne_Groupe, foreignKey: 'groupeId'})

db.AnneeUniversitaire.belongsToMany(db.Semestre, {through: db.AnneeUniversitaire_Semestre, foreignKey: 'anneeUniversitaireId'})
db.Semestre.belongsToMany(db.AnneeUniversitaire, {through: db.AnneeUniversitaire_Semestre, foreignKey: 'semestreId'})



module.exports = db
