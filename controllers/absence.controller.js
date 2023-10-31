const { Op } = require('sequelize')
const db = require('../models')
const { Absence, Niveau, Prof, Personne, Etudiant, TrancheHoraire, Semestre, Groupe, Salle, EC, TypeTrancheHoraire } = db
const asyncHandler = require('express-async-handler')



const getAllAbsence = asyncHandler(async (req, res) => {

    const Absences = await Absence.findAll({
        include: [
            {
                model: Personne,
                include: [{
                    model: Etudiant
                },
                { model: Prof }]
            },
            {
                model: TrancheHoraire,
                include: [{
                    model: Semestre,
                }, {
                    model: Prof
                }, {
                    model: Groupe
                }, {
                    model: Salle
                }, {
                    model: EC
                }, {
                    model: TypeTrancheHoraire
                }]

            }
        ]
    })

    res.status(200).json(Absences)
}
)


const getOneAbsence = asyncHandler(async (req, res) => {
    const absence = await Absence.findByPk(req.params.id, {
        include: [
            {
                model: Personne,
                include: [{
                    model: Etudiant
                },
                { model: Prof }]
            },
            {
                model: TrancheHoraire,
                include: [{
                    model: Semestre,
                }, {
                    model: Prof
                }, {
                    model: Groupe
                }, {
                    model: Salle
                }, {
                    model: EC
                }, {
                    model: TypeTrancheHoraire
                }]

            }
        ]
    })

    if (!absence) {
        res.status(400).json({
            message: 'Absence non existant'
        })
    }

    res.status(200).json(absence)

})


const postAbsence = asyncHandler(async (req, res) => {
    const { personneIds, tranchehoraireId } = req.body

    if(personneIds.lenght === 0){
        await TrancheHoraire.udpate({
            isValider: true
        },{where : {code_tranchehoraire : tranchehoraireId }}).then(()=> {
            res.status(200).json({
                message: "Toutes les personnes sont présentes "
            })
        })
       
    }
    else {
        const abs = personneIds.map(async personneId => {
            const fetchedAbsence = await Absence.findOne({
                where: { [Op.and]: [{ personneId }, { tranchehoraireId }] }
            })
    
             if (fetchedAbsence) {
                    res.status(400).json({message: "Absence déja existant"})
                } else {
                     await Absence.create({
                        personneId,
                        tranchehoraireId
                    }).then(()=> {
                        console.log({
                            'message': "Personne ajoutée à la liste des absents.",                       
                        })
                    }).catch(err => {
                        res.status(400).json({message: err})
    
                    })
                          
                }
    
        })
        Promise.all(abs).then(async ()=>{
            await TrancheHoraire.udpate({
                isValider: true
            },{where : {code_tranchehoraire : tranchehoraireId }})
            res.status(201).json({message: 'Tous les personnes selectionnées sont ajoutées au liste des absents'})
        })
    }

    

        


})

const updateAbsence = asyncHandler(async (req, res) => {
    const { personneId, tranchehoraireId } = req.body
    
    const fetchedAbsence = await Absence.findOne({
        where: { [Op.and]: [{ personneId }, { tranchehoraireId }] }
    })

    if (!fetchedAbsence) {
        res.status(400).json({ message: 'Absence non existante' })
    } else {
        await Absence.update({
            personneId,
            tranchehoraireId
    
        }, {
            where: { [Op.and]: [{ personneId: fetchedAbsence.personneId }, { tranchehoraireId: fetchedAbsence.tranchehoraireId  }] }
    
        }
        ).then(() => {
    
            res.status(200).json(`Absence modifié`)
        }).catch(err => {
            res.status(500).json({ message: err.parent.detail })
        })
    }

    

})

const deleteAbsence = asyncHandler(async (req, res) => {
    const { personneId, tranchehoraireId } = req.body

    const fetchedAbsence = await Absence.findOne({
        where: { [Op.and]: [{ personneId }, { tranchehoraireId }] }
    })

    if (!fetchedAbsence) {
        res.status(400).json({ message: "Absence non existante" });
    }
    else {
        await Absence.destroy({ where: { [Op.and]: [{ personneId }, { tranchehoraireId }] }}).then(()=>{
            res.status(200).json({ message: `Absence supprimée` });
    
        });
    }
   

})





module.exports = {
    getAllAbsence,
    getOneAbsence,
    postAbsence,
    updateAbsence,
    deleteAbsence,
}