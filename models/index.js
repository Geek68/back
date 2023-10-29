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
db.Niveau.belongsToMany(db.AnneeUniversitaire, {through: db.Inscrit, foreignKey: 'niveauId'})
db.AnneeUniversitaire.belongsToMany(db.Etudiant, {through: db.Inscrit, foreignKey: 'anneeUniversitaireId'})


db.Etudiant.hasMany(db.Inscrit,{
    foreignKey: 'etudiantId', targetKey: 'id_etudiant'
})
db.Inscrit.belongsTo(db.Etudiant, {
    foreignKey: 'etudiantId', targetKey: 'id_etudiant'
})
db.Niveau.hasMany(db.Inscrit,{
    foreignKey: 'niveauId', targetKey: 'code_niveau'
})
db.Inscrit.belongsTo(db.Niveau, {
    foreignKey: 'niveauId', targetKey: 'code_niveau'
})

db.AnneeUniversitaire.hasMany(db.Inscrit,{
    foreignKey: 'anneeUniversitaireId', targetKey: 'id_anneeUniversitaire'
})
db.Inscrit.belongsTo(db.AnneeUniversitaire, {
    foreignKey: 'anneeUniversitaireId', targetKey: 'id_anneeUniversitaire'
})



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




db.Personne.hasMany(db.Etudiant,{
    foreignKey: 'personneId', targetKey: 'id_personne', onDelete: 'CASCADE',
})

db.Etudiant.belongsTo(db.Personne,{
    foreignKey: 'personneId', targetKey: 'id_personne' , onDelete: 'CASCADE'
})


db.Personne.hasMany(db.Prof,{
    foreignKey: 'personneId', targetKey: 'id_personne' , onDelete: 'CASCADE'
})

db.Prof.belongsTo(db.Personne,{
    foreignKey: 'personneId', targetKey: 'id_personne' , onDelete: 'CASCADE'
})

db.Groupe.hasMany(db.TrancheHoraire,{
    foreignKey: 'groupeId', targetKey: 'id_groupe'
})

db.TrancheHoraire.belongsTo(db.Groupe,{
    foreignKey: 'groupeId', targetKey: 'id_groupe'
})

db.Personne.belongsToMany(db.Groupe, {through: db.Personne_Groupe, foreignKey: 'personneId'})
db.Groupe.belongsToMany(db.Personne, {through: db.Personne_Groupe, foreignKey: 'groupeId'})

db.Personne.hasMany(db.Personne_Groupe,{
    foreignKey : 'personneId', targetKey : 'id_personne'
})
db.Personne_Groupe.belongsTo(db.Personne, {
    foreignKey: 'personneId', targetKey: 'id_personne'
})
db.Groupe.hasMany(db.Personne_Groupe,{
    foreignKey : 'groupeId', targetKey : 'id_groupe'
})
db.Personne_Groupe.belongsTo(db.Groupe, {
    foreignKey: 'groupeId', targetKey: 'id_groupe'
})


db.AnneeUniversitaire.belongsToMany(db.Semestre, {through: db.AnneeUniversitaire_Semestre, foreignKey: 'anneeUniversitaireId'})
db.Semestre.belongsToMany(db.AnneeUniversitaire, {through: db.AnneeUniversitaire_Semestre, foreignKey: 'semestreId'})

db.AnneeUniversitaire.hasMany(db.AnneeUniversitaire_Semestre,{
    foreignKey : 'anneeUniversitaireId', targetKey : 'id_anneeUniversitaire'
})
db.AnneeUniversitaire_Semestre.belongsTo(db.AnneeUniversitaire, {
    foreignKey: 'anneeUniversitaireId', targetKey: 'id_anneeUniversitaire'
})
db.Semestre.hasMany(db.AnneeUniversitaire_Semestre,{
    foreignKey : 'semestreId', targetKey : 'id_semestre'
})
db.AnneeUniversitaire_Semestre.belongsTo(db.Semestre, {
    foreignKey: 'semestreId', targetKey: 'id_semestre'
})

module.exports = db
