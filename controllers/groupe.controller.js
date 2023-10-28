const db = require('../models')
const {Groupe, Niveau,Prof,Etudiant, Personne, TrancheHoraire} = db
const asyncHandler = require('express-async-handler')



const getAllGroupe = asyncHandler(async (req, res) => {

    const Groupes = await Groupe.findAll({
        include: [
        {
            model: Personne,
            include: [{
                model: Etudiant
            },
        {
            model: Prof
        }]
        },
        {
           model: TrancheHoraire,
           
        }
       ]
    })

    res.status(200).json(Groupes)
}
)


const getOneGroupe = asyncHandler(async (req, res) => {
    const groupe = await Groupe.findByPk(req.params.id,{
        include: [
            {
                model: Personne,
                include: [{
                    model: Etudiant
                },
            {
                model: Prof
            }]
            },
            {
               model: TrancheHoraire,
               
            }
           ]
           
    })

    if (!groupe) {
        res.status(400).json({
            message: 'Groupe non existant'
        })
    }

    res.status(200).json(groupe)

})


const postGroupe = asyncHandler(async (req, res) => {
    const { nom_groupe } = req.body

    const fetchedGroupe = await Groupe.findOne({ where: {nom_groupe}
})

    if (fetchedGroupe) {
        res.status(400).json({message: "Groupe déja existant"})
    } else {
        const groupe = await Groupe.create({
            nom_groupe,
        })

        res.status(200).json({
            'message': "Groupe ajouté avGroupe succès.",
            'Groupe': groupe
        })
    }
})

    const updateGroupe = asyncHandler(async (req, res) => {
        const { nom_groupe } = req.body
        const fetchedGroupe = await Groupe.findByPk(req.params.id)
        
        if (!fetchedGroupe) {
            res.status(400).json({message : 'Groupe non existante'})
        }
        
                await Groupe.update({
                    nom_groupe,
                    
                   
                },{ where : {
                    id_groupe : req.params.id
                }

                
                }
                ).then(() => {
                    
                    res.status(200).json(`Groupe ${req.params.id} modifié`)
                }).catch(err => {
                    res.status(500).json({message: err.parent.detail})
                })   

    })

    const deleteGroupe = asyncHandler(async (req,res)=>{
        const fetchedGroupe = await Groupe.findByPk(req.params.id);
    if (!fetchedGroupe) {
        res.status(400).json({message : "Groupe non existante" });
    }

    await Groupe.destroy({where:{id_groupe: req.params.id}});
    res.status(200).json({message : `Groupe ${fetchedGroupe.nom_groupe} supprimée`});

    })
    




module.exports = {
    getAllGroupe,
    getOneGroupe,
    postGroupe,
    updateGroupe,
    deleteGroupe,
}