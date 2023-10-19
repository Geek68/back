const db = require('../models')
const {Seance} = db
const asyncHandler = require('express-async-handler')


//@desc get all students
//@route GET /api/students
//@acces Private
const getAllSeance = asyncHandler(async (req, res) => {

    const seances = await Seance.findAll()

    res.status(200).json(seances)
}
)

//@desc get one student
//@route GET /api/students/:id
//@acces Private
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

    const fetchedSeance = await Seance.findOne({ where: {designation : designation}
})

    if (fetchedSeance) {
        res.status(400).json({message: "Seance déja existant"})
    } else {
        const seance = await Seance.create({
           designation
        })

        res.status(200).json({
            'message': "Seance ajoutée avec succès.",
            'Seance': seance
        })
    }
})

    //@desc update a student
    //@route PUT /api/students/:id
    //@acces Private
    const updateSeance = asyncHandler(async (req, res) => {
        const { designation } = req.body
        const fetchedSeance = await Seance.findByPk(req.params.id)
        
        if (!fetchedSeance) {
            res.status(400).json({message : 'Seance non existante'})
        }
        
                await Seance.update({
                   designation
                },{ where : {
                    code_seance : req.params.id
                }

                
                }
                ).then(() => {
                    
                    res.status(200).send('Seance modifiée')
                }).catch(err => {
                    res.status(500).json({message: err.parent.detail})
                })   

    })

    const deleteSeance = asyncHandler(async (req,res)=>{
        const fetchedSeance = await Seance.findByPk(req.params.id);
    if (!fetchedSeance) {
        res.status(400).json({message : "Seance non existante" });
    }

    await Seance.destroy({where:{code_Seance: req.params.id}});
    res.status(200).json({message : `Seance ${fetchedSeance.designation} supprimée`});

    })


module.exports = {
    getAllSeance,
    getOneSeance,
    postSeance,
    updateSeance,
    deleteSeance,
}