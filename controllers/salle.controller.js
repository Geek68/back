const db = require('../models')
const {Salle, TrancheHoraire,Personne, Etudiant, Groupe} = db
const asyncHandler = require('express-async-handler')


const getAllSalle = asyncHandler(async (req, res) => {

    const Salles = await Salle.findAll({
        include: {
            model: TrancheHoraire,
            include: { model: Groupe,
                include: {
                    model: Personne,
                    include: {
                        model: Etudiant
                    }
                }
            
            }
        }
    })

    res.status(200).json(Salles)
}
)


const getOneSalle = asyncHandler(async (req, res) => {
    const salle = await Salle.findByPk(req.params.id,{
        include: {
            model: TrancheHoraire,
            include: { model: Groupe,
                include: {
                    model: Personne,
                    include: {
                        model: Etudiant
                    }
                }
            
            }
        }
    })
    if (!salle) {
        res.status(400).json({
            message: 'Salle non existant'
        })
    }

    res.status(200).json(salle)

})


const postSalle = asyncHandler(async (req, res) => {
    const { numero_salle, localisation_salle, capacite_salle } = req.body

    const fetchedSalle = await Salle.findOne({ where: {numero_salle}
})

    if (fetchedSalle) {
        res.status(400).json({message: "Salle déja existant"})
    } else {
        const salle = await Salle.create({
           numero_salle,
           localisation_salle,
           capacite_salle
        })

        res.status(200).json({
            'message': "Salle ajouté avec succès.",
            'Salle': salle
        })
    }
})


    const updateSalle = asyncHandler(async (req, res) => {
        const { numero_salle, localisation_salle, capacite_salle } = req.body
        const fetchedSalle = await Salle.findByPk(req.params.id)
        
        if (!fetchedSalle) {
            res.status(400).json({message : 'Salle non existante'})
        }
        
                await Salle.update({
                   numero_salle,
                   localisation_salle,
                   capacite_salle
                },{ where : {
                    code_salle : req.params.id
                }

                
                }
                ).then(() => {
                    
                    res.status(200).send('Salle modifiée')
                }).catch(err => {
                    res.status(500).json({message: err.parent.detail})
                })   

    })

    const deleteSalle = asyncHandler(async (req,res)=>{
        const fetchedSalle = await Salle.findByPk(req.params.id);
    if (!fetchedSalle) {
        res.status(400).json({message : "Salle non existante" });
    }

    await Salle.destroy({where:{code_Salle: req.params.id}});
    res.status(200).json({message : `Salle ${fetchedSalle.numero_salle} supprimée`});

    })


module.exports = {
    getAllSalle,
    getOneSalle,
    postSalle,
    updateSalle,
    deleteSalle,
}