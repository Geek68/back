const db = require('../models')
const {Matiere,Niveau,Prof} = db
const asyncHandler = require('express-async-handler')



const getAllMatiere = asyncHandler(async (req, res) => {

    const matieres = await Matiere.findAll({
        include: [{
            model: Prof
        },
        {
            model: Niveau
        }
       ]
    })

    res.status(200).json(matieres)
}
)


const getOneMatiere = asyncHandler(async (req, res) => {
    const matiere = await Matiere.findByPk(req.params.id,{
        include: [{
            model: Niveau
        },
        {
            model: Prof
        }]
    })

    if (!matiere) {
        res.status(400).json({
            message: 'Matiere non existant'
        })
    }

    res.status(200).json(matiere)

})


const postMatiere = asyncHandler(async (req, res) => {
    const { designation, profId, niveauId  } = req.body

    const fetchedMatiere = await Matiere.findOne({ where: {designation : designation}
})

    if (fetchedMatiere) {
        res.status(400).json({message: "Matiere déja existant"})
    } else {
        const matiere = await Matiere.create({
           designation,
           profId,
           niveauId
        })

        res.status(200).json({
            'message': "Matiere ajouté avec succès.",
            'Matiere': matiere
        })
    }
})

    const updateMatiere = asyncHandler(async (req, res) => {
        const { designation, profId } = req.body
        const fetchedMatiere = await Matiere.findByPk(req.params.id)
        
        if (!fetchedMatiere) {
            res.status(400).json({message : 'Matiere non existante'})
        }
        
                await Matiere.update({
                   designation,
                   profId
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
    




module.exports = {
    getAllMatiere,
    getOneMatiere,
    postMatiere,
    updateMatiere,
    deleteMatiere,
}