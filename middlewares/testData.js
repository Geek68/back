const db = require('../models')
const {Parcours, Niveau} = db
const asyncHandler = require('express-async-handler')

const testParcours = asyncHandler(async () => {

    const all_parcours = await Parcours.findAll()
    if(all_parcours.length === 0 ){
        const parcours = await Parcours.bulkCreate([
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
}
)


module.exports = {
    testParcours
}