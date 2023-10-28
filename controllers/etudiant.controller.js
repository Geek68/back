const db = require('../models')
const { Etudiant, Personne, TrancheHoraire, Absence, Groupe, Niveau, Personne_Groupe } = db
const asyncHandler = require('express-async-handler')
const { Op } = require('sequelize')
const fs = require('fs')


//@desc get all Etudiants
//@route GET /api/Etudiants
//@acces Private
const getAllEtudiants = asyncHandler(async (req, res) => {

    const etudiants = await Etudiant.findAll({
        include: {
            model: Niveau
        }
    })

    res.status(200).json(etudiants)
}
)

//@desc get one Etudiant
//@route GET /api/Etudiants/:id
//@acces Private
const getOneEtudiant = asyncHandler(async (req, res) => {
    const etudiant = await Etudiant.findByPk(req.params.id, {
        include: {
            model: Personne
        }
    })
    if (!etudiant) {
        res.status(400).json({
            message: 'Etudiant non existant'
        })
    }

    res.status(200).json(etudiant)

})


const postEtudiant = asyncHandler(async (req, res) => {
    const { lastname, firstname, cin, email, phone, course, level, birth_place, birth_date } = req.body

    const fetchedEtudiant = await Etudiant.findOne({
        where: {
            [Op.or]: [{ cin }, { phone }, { email }
            ]
        }
    })

    if (fetchedEtudiant) {
        res.status(400).json({ message: "Etudiant déja existant" })
    } else {
        const Etudiant = await Etudiant.create({
            lastname,
            firstname,
            cin,
            email,
            phone,
            course,
            level,
            birth_place,
            birth_date,
            profile_pic: req.file.path
        })

        res.status(200).json({
            'message': "Etudiant ajouté avec succès.",
            'Etudiant': Etudiant
        })
    }
})

//@desc update a Etudiant
//@route PUT /api/Etudiants/:id
//@acces Private
const updateEtudiant = asyncHandler(async (req, res) => {
    const { lastname, firstname, cin, email, phone, course, level, birth_place, birth_date } = req.body
    const fetchedEtudiant = await Etudiant.findByPk(req.params.id)

    if (!fetchedEtudiant) {
        res.status(400).json({ message: 'this Etudiant does not exist' })
    }

    await Etudiant.update({
        lastname,
        firstname,
        cin,
        email,
        phone,
        course,
        level,
        birth_place,
        birth_date,
    }, {
        where: {
            Etudiant_code: req.params.id
        }


    }
    ).then(() => {
        fs.unlinkSync(fetchedEtudiant.profile_pic)
        res.status(200).send('Etudiant modifié')
    }).catch(err => {
        res.status(500).json({ message: err.parent.detail })
    })

})

const deleteEtudiant = asyncHandler(async (req, res) => {
    const fetchedEtudiant = await Etudiant.findByPk(req.params.id);
    if (!fetchedEtudiant) {
        res.status(400).json({ message: "this Etudiant does not exist" });
    }

    await Etudiant.destroy({ where: { Etudiant_code: req.params.id } });
    fs.unlinkSync(fetchedEtudiant.profile_pic)
    res.status(200).json({ message: `Etudiant ${fetchedEtudiant.name} supprimé` });

})

const getPromotion = asyncHandler(async (req, res) => {
    const promotion = await Etudiant.findAll({
        where: {
            niveauId: req.body.niveauId
        }
    }).then(() => {
        res.status(200).json(promotion)
    }).catch(err => {
        res.status(500).json(err.parent.detail)
    })

})

const updateEtudiantPic = async (req, res) => {
    let { id } = req.params
    const fetchedEtudiant = await Etudiant.findByPk(id)

    await Etudiant.update({
        profil_pic: req.file.path,
    }, {
        where: { id: id }
    })
        .then(_ => {
            if (fs.existsSync(fetchedEtudiant.profil_pic)) {
                fs.unlinkSync(fetchedEtudiant.profil_pic)
            }
            Etudiant.findByPk(id).then(Etudiant => res.status(200).json({ data: Etudiant, message: 'Etudiant updated' }))
        })
        .catch(err => {
            console.error(err)
            res.status(500).json({ message: err })
        })
}

module.exports = {
    getAllEtudiants,
    getOneEtudiant,
    postEtudiant,
    updateEtudiant,
    deleteEtudiant,
    getPromotion,
    updateEtudiantPic
}