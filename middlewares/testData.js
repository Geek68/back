const db = require("../models");
const { Salle, Niveau } = db;

const handleStart = async () => {
    const all_niveaux = await Niveau.findAll()
    if(all_niveaux.length === 0 ){
        await Niveau.bulkCreate([
            { niveau_libelle: 'L1 PRO' },
            { niveau_libelle: 'L1 IG' },
            { niveau_libelle: 'L2 GB' },
            { niveau_libelle: 'L2 SR' },
            { niveau_libelle: 'L2 IG' },
            { niveau_libelle: 'L3 GB' },
            { niveau_libelle: 'L3 SR' },
            { niveau_libelle: 'L3 IG' },
            { niveau_libelle: 'M1 GB' },
            { niveau_libelle: 'M1 SR' },
            { niveau_libelle: 'M1 IG' },
            { niveau_libelle: 'M2 GB' },
            { niveau_libelle: 'M2 SR' },
            { niveau_libelle: 'M2 IG' },
          ]).then(()=>{
            console.log('Niveaux ajoutées avec succès')
         }).catch(err => {
            console.log(err.parent.detail)
         })
        }

    const all_salles = await Salle.findAll()
    if(all_salles.length === 0 ){
      await Salle.bulkCreate([
        {numero_salle : 'S001', localisation_salle: 'RDC', capacite_salle : 150},
        {numero_salle : 'S002', localisation_salle: 'RDC', capacite_salle : 150},
        {numero_salle : 'S003', localisation_salle: 'RDC', capacite_salle : 150},
        {numero_salle : 'S004', localisation_salle: 'RDC', capacite_salle : 150},
        {numero_salle : 'S005', localisation_salle: 'RDC', capacite_salle : 150},
        {numero_salle : 'S006', localisation_salle: 'RDC', capacite_salle : 150},
        {numero_salle : 'S007', localisation_salle: 'RDC', capacite_salle : 150},
        {numero_salle : 'S008', localisation_salle: 'RDC', capacite_salle : 150},
      ]).then(()=>{
        console.log('Salles ajoutées avec succès')
     }).catch(err => {
        console.log(err.parent.detail)
     })
    }

    const all_semestres = await db.Semestre.findAll()
    if(all_semestres.length === 0 ){
      await db.Semestre.bulkCreate([
        {semestre_libelle : 'S1'},
        {semestre_libelle : 'S2'},
        {semestre_libelle : 'S3'},
        {semestre_libelle : 'S4'},
        {semestre_libelle : 'S5'},
        {semestre_libelle : 'S6'},
        {semestre_libelle : 'S7'},
        {semestre_libelle : 'S8'},
        {semestre_libelle : 'S9'},
        {semestre_libelle : 'S10'},

       
      ]).then(()=>{
        console.log('Semestres ajoutées avec succès')
     }).catch(err => {
        console.log(err.parent.detail)
     })
    }


    // const all_annee = await db.AnneeUniversitaire.findAll()
    // if(all_annee.length === 0 ){
    //   await db.AnneeUniversitaire.bulkCreate([
    //     {annee_debut : '2018', annee_fin: '2019',},
     
    //   ]).then(()=>{
    //     console.log('Années ajoutées avec succès')
    //  }).catch(err => {
    //     console.log(err.parent.detail)
    //  })
    // }


    const typetranches = await db.TypeTrancheHoraire.findAll()
    if(typetranches.length === 0 ){
      await db.TypeTrancheHoraire.bulkCreate([
        {typetranchehoraire_libelle : 'TD'},
        {typetranchehoraire_libelle : 'TP'},
     
      ]).then(()=>{
        console.log('Types Tranches horaires ajoutées avec succès')
     }).catch(err => {
        console.log(err.parent.detail)
     })
    }

    console.log('Db synced')


}
module.exports = {
    handleStart,
}