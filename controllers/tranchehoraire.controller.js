const { Op } = require('sequelize')
const db = require('../models')
const { TrancheHoraire, Prof, Absence, Etudiant, Personne } = db
const asyncHandler = require('express-async-handler')



const getAllTrancheHoraire = asyncHandler(async (req, res) => {

    const TrancheHoraires = await TrancheHoraire.findAll({
        include: [{
            model: Prof
        },
        {
            model: Absence,
            include: {
                model: Personne,
                include: {
                    model: Etudiant
                }
            }
        },
   ]
    })

    res.status(200).json(TrancheHoraires)
}
)


const getOneTrancheHoraire = asyncHandler(async (req, res) => {
    const trancheHoraire = await TrancheHoraire.findByPk(req.params.id,{
        include: [{
            model: Prof
        },
        {
            model: Absence,
            include: {
                model: Personne,
                include: {
                    model: Etudiant
                }
            }
        },
   ]
    })
    if (!trancheHoraire) {
        res.status(400).json({
            message: 'TrancheHoraire non existante'
        })
    }

    res.status(200).json(trancheHoraire)

})


const postTrancheHoraire = asyncHandler(async (req, res) => {
    const { date_trancheHoraire, heure_debut, heure_fin, salleId, elementId, semestreId, typetranchehoraireId, profId, groupeId } = req.body

    const fetchedTrancheHoraire = await TrancheHoraire.findOne({
        where: { [Op.and]: [{ date_trancheHoraire}, { heure_debut }, {elementId}, {salleId}] }
    })

    if (fetchedTrancheHoraire) {
        res.status(400).json({ message: "TrancheHoraire déja existant" })
    } else {
        const trancheHoraire = await TrancheHoraire.create({
            date_trancheHoraire, 
            heure_debut, 
            heure_fin, 
            salleId, 
            elementId, 
            semestreId, 
            typetranchehoraireId, 
            profId, 
            groupeId
        })

        res.status(200).json({
            'message': "TrancheHoraire ajoutée avec succès.",
            'TrancheHoraire': trancheHoraire
        })
    }
})


const updateTrancheHoraire = asyncHandler(async (req, res) => {
    const { date_trancheHoraire, heure_debut, heure_fin, salleId, elementId, semestreId, typetranchehoraireId, profId, groupeId } = req.body
    const fetchedTrancheHoraire = await TrancheHoraire.findByPk(req.params.id)

    if (!fetchedTrancheHoraire) {
        res.status(400).json({ message: 'TrancheHoraire non existante' })
    }

    const trancheHoraire = await TrancheHoraire.update({
        date_trancheHoraire, 
        heure_debut, 
        heure_fin, 
        salleId, 
        elementId, 
        semestreId, 
        typetranchehoraireId, 
        profId, 
        groupeId
    }, {
        where: {
            code_tranchehoraire: req.params.id
        }


    }
    ).then(() => {

        res.status(200).send('TrancheHoraire modifiée')
    }).catch(err => {
        res.status(500).json({ message: err.parent.detail })
    })

})

const deleteTrancheHoraire = asyncHandler(async (req, res) => {
    const fetchedTrancheHoraire = await TrancheHoraire.findByPk(req.params.id);
    if (!fetchedTrancheHoraire) {
        res.status(400).json({ message: "TrancheHoraire non existante" });
    }

    await TrancheHoraire.destroy({ where: { code_tranchehoraire: req.params.id } });
    res.status(200).json({ message: `TrancheHoraire supprimée` });

})


module.exports = {
    getAllTrancheHoraire,
    getOneTrancheHoraire,
    postTrancheHoraire,
    updateTrancheHoraire,
    deleteTrancheHoraire,
}