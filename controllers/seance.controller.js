const db = require('../models')
const { Seance, Prof, Absence, Student } = db
const asyncHandler = require('express-async-handler')



const getAllSeance = asyncHandler(async (req, res) => {

    const seances = await Seance.findAll({
        include: [{
            model: Prof
        },
        {
            model: Absence,
            include: {
                model: Student
            }
        }]
    })

    res.status(200).json(seances)
}
)


const getOneSeance = asyncHandler(async (req, res) => {
    const seance = await Seance.findByPk(req.params.id)
    if (!seance) {
        res.status(400).json({
            message: 'Seance non existante'
        })
    }

    res.status(200).json(Seance)

})


const postSeance = asyncHandler(async (req, res) => {
    const { designation } = req.body
    const date = new Date()

    const fetchedSeance = await Seance.findOne({
        where: { designation: designation }
    })

    if (fetchedSeance) {
        res.status(400).json({ message: "Seance déja existant" })
    } else {
        const seance = await Seance.create({
            designation,
            date_seance: date
        })

        res.status(200).json({
            'message': "Seance ajoutée avec succès.",
            'Seance': seance
        })
    }
})


const updateSeance = asyncHandler(async (req, res) => {
    const { designation, date_seance } = req.body
    const fetchedSeance = await Seance.findByPk(req.params.id)

    if (!fetchedSeance) {
        res.status(400).json({ message: 'Seance non existante' })
    }

    await Seance.update({
        designation,
        date_seance
    }, {
        where: {
            code_seance: req.params.id
        }


    }
    ).then(() => {

        res.status(200).send('Seance modifiée')
    }).catch(err => {
        res.status(500).json({ message: err.parent.detail })
    })

})

const deleteSeance = asyncHandler(async (req, res) => {
    const fetchedSeance = await Seance.findByPk(req.params.id);
    if (!fetchedSeance) {
        res.status(400).json({ message: "Seance non existante" });
    }

    await Seance.destroy({ where: { code_Seance: req.params.id } });
    res.status(200).json({ message: `Seance ${fetchedSeance.designation} supprimée` });

})


module.exports = {
    getAllSeance,
    getOneSeance,
    postSeance,
    updateSeance,
    deleteSeance,
}