const db = require('../models')
const {Parcours} = db
const asyncHandler = require('express-async-handler')


//@desc get all students
//@route GET /api/students
//@acces Private
const getAllParcours = asyncHandler(async (req, res) => {

    const parcours = await Parcours.findAll()

    res.status(200).json(parcours)
}
)

//@desc get one student
//@route GET /api/students/:id
//@acces Private
const getOneParcours = asyncHandler(async (req, res) => {
    const parcours = await Parcours.findByPk(req.params.id)
    if (!parcours) {
        res.status(400).json({
            message: 'Parcours non existant'
        })
    }

    res.status(200).json(parcours)

})


const postParcours = asyncHandler(async (req, res) => {
    const { designation } = req.body

    const fetchedParcours = await Parcours.findOne({ where: {designation : designation}
})

    if (fetchedParcours) {
        res.status(400).json({message: "Parcours déja existant"})
    } else {
        const parcours = await Parcours.create({
           designation
        })

        res.status(200).json({
            'message': "Parcours ajouté avec succès.",
            'Parcours': parcours
        })
    }
})

    //@desc update a student
    //@route PUT /api/students/:id
    //@acces Private
    const updateParcours = asyncHandler(async (req, res) => {
        const { designation } = req.body
        const fetchedParcours = await Parcours.findByPk(req.params.id)
        
        if (!fetchedParcours) {
            res.status(400).json({message : 'Parcours non existante'})
        }
        
                await Parcours.update({
                   designation
                },{ where : {
                    code_parcours : req.params.id
                }

                
                }
                ).then(() => {
                    
                    res.status(200).send('Parcours modifié')
                }).catch(err => {
                    res.status(500).json({message: err.parent.detail})
                })   

    })

    const deleteParcours = asyncHandler(async (req,res)=>{
        const fetchedParcours = await Parcours.findByPk(req.params.id);
    if (!fetchedParcours) {
        res.status(400).json({message : "Parcours non existant" });
    }

    await Parcours.destroy({where:{code_Parcours: req.params.id}});
    res.status(200).json({message : `Parcours ${fetchedParcours.designation} supprimée`});

    })


module.exports = {
    getAllParcours,
    getOneParcours,
    postParcours,
    updateParcours,
    deleteParcours,
}