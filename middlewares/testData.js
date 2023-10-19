const db = require('../models')
const {Parcours, Niveau} = db

const handleStart = async () => {
    const all_parcours = await Parcours.findAll()
    if(all_parcours.length === 0 ){
        const parcours =  await Parcours.bulkCreate([
            { designation: 'PRO' },
            { designation: 'GB' },
            { designation: 'SR' },
            { designation: 'IG' },
          ]).then(()=>{
            console.log('parcours ajouté avec succès')
         }).catch(err => {
            console.log(err.parent.detail)
         })
    } else {
        console.log('efa misy parcours ao')
    }

    const all_parcour = await Parcours.findAll()
    const all_niveau = await Niveau.findAll();
    if(all_niveau.length === 0 ){
        all_parcour.forEach(async parcours => {
            if(parcours.designation == 'PRO'){
                const niveaux = await Niveau.bulkCreate([
                    { designation: 'L1', parcoursId: parcours.code_parcours },
                    
                  ]).then(()=>{
                    console.log('parcours PRO ajouté avec succès')
                 }).catch(err => {
                    console.log(err.parent.detail)
                 })
            } else {
                const niveaux = await Niveau.bulkCreate([
                    { designation: 'L1', parcoursId: parcours.code_parcours },
                    { designation: 'L2', parcoursId: parcours.code_parcours },
                    { designation: 'L3', parcoursId: parcours.code_parcours },
                    { designation: 'M1', parcoursId: parcours.code_parcours },
                    { designation: 'M2', parcoursId: parcours.code_parcours },
                  ]).then(()=>{
                    console.log('Niveau ajouté avec succès')
                 }).catch(err => {
                    console.log(err.parent.detail)
                 })
            }
           
        });
    } else {
        console.log('efa misy niveau ao')
    }

    console.log('Db synced')


}






module.exports = {
    handleStart,
}