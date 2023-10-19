const db = require('../models')
const {Matiere, Prof} = db
const asyncHandler = require('express-async-handler')


//@desc get all students
//@route GET /api/students
//@acces Private
const getAllMatiere = asyncHandler(async (req, res) => {

    const matieres = await Matiere.findAll()

    res.status(200).json(matieres)
}
)

//@desc get one student
//@route GET /api/students/:id
//@acces Private
const getOneMatiere = asyncHandler(async (req, res) => {
    const matiere = await Matiere.findByPk(req.params.id)
    if (!matiere) {
        res.status(400).json({
            message: 'Matiere non existant'
        })
    }

    res.status(200).json(matiere)

})


const postMatiere = asyncHandler(async (req, res) => {
    const { designation } = req.body

    const fetchedMatiere = await Matiere.findOne({ where: {designation : designation}
})

    if (fetchedMatiere) {
        res.status(400).json({message: "Matiere déja existant"})
    } else {
        const matiere = await Matiere.create({
           designation
        })

        res.status(200).json({
            'message': "Matiere ajouté avec succès.",
            'Matiere': matiere
        })
    }
})

    //@desc update a student
    //@route PUT /api/students/:id
    //@acces Private
    const updateMatiere = asyncHandler(async (req, res) => {
        const { designation } = req.body
        const fetchedMatiere = await Matiere.findByPk(req.params.id)
        
        if (!fetchedMatiere) {
            res.status(400).json({message : 'Matiere non existante'})
        }
        
                await Matiere.update({
                   designation
                },{ where : {
                    code_matiere : req.params.id
                }

                
                }
                ).then(() => {
                    
                    res.status(200).send('Matiere modifiée')
                }).catch(err => {
                    res.status(500).json({message: err.parent.detail})
                })   

    })

    const deleteMatiere = asyncHandler(async (req,res)=>{
        const fetchedMatiere = await Matiere.findByPk(req.params.id);
    if (!fetchedMatiere) {
        res.status(400).json({message : "Matiere non existante" });
    }

    await Matiere.destroy({where:{code_matiere: req.params.id}});
    res.status(200).json({message : `Matiere ${fetchedMatiere.designation} supprimée`});

    })
    

    const getMatierByProfId = asyncHandler(async (req, res, profId) => {
        const matiereProf = await Prof.find({
            include: Matiere,
            where : {
                id: {profId}
            }
        }).then(()=>{
            res.status(200).json(matiereProf)
        }).catch(err => {
            res.status(500).json(err.parent.detail)
        })

        
    })


module.exports = {
    getAllMatiere,
    getOneMatiere,
    postMatiere,
    updateMatiere,
    deleteMatiere,
    getMatierByProfId,
}