const db = require('../models')
const {Niveau, Inscrit,Personne, AnneeUniversitaire, Etudiant,EC} = db
const asyncHandler = require('express-async-handler')


const getAllNiveau = asyncHandler(async (req, res) => {

    const niveaux = await Niveau.findAll({
        order:[['code_niveau', 'ASC']],
        include: [{
            model : Inscrit,
            include : [{
                model: Etudiant,
                include : {
                    model : Personne
                } 
            },{
                model : AnneeUniversitaire
            }]
        },{
            model: EC
        }]
    })

    res.status(200).json(niveaux)
}
)


const getOneNiveau = asyncHandler(async (req, res) => {
    const niveau = await Niveau.findByPk(req.params.id,{
        include: [{
            model : Inscrit,
            include : [{
                model: Etudiant,
                include : {
                    model : Personne
                } 
            },{
                model : AnneeUniversitaire
            }]
        }, {
            model: EC
        }]
    })
    if (!niveau) {
        res.status(400).json({
            message: 'Niveau non existant'
        })
    }

    res.status(200).json(niveau)

})


const postNiveau = asyncHandler(async (req, res) => {
    const { niveau_libelle } = req.body

    const fetchedNiveau = await Niveau.findOne({ where: {niveau_libelle : niveau_libelle}
})

    if (fetchedNiveau) {
        res.status(400).json({message: "Niveau déja existant"})
    } else {
        const niveau = await Niveau.create({
            niveau_libelle
        })

        res.status(200).json({
            'message': "Niveau ajouté avec succès.",
            'Niveau': niveau
        })
    }
})

    const updateNiveau = asyncHandler(async (req, res) => {
        const { niveau_libelle } = req.body
        const fetchedNiveau = await Niveau.findByPk(req.params.id)
        
        if (!fetchedNiveau) {
            res.status(400).json({message : 'Niveau non existante'})
        }
        
                await Niveau.update({
                    niveau_libelle
                },{ where : {
                    code_niveau : req.params.id
                }

                
                }
                ).then(() => {
                    
                    res.status(200).json({message:'Niveau modifiée'})
                }).catch(err => {
                    res.status(500).json({message: err.parent.detail})
                })   

    })

    const deleteNiveau = asyncHandler(async (req,res)=>{
        const fetchedNiveau = await Niveau.findByPk(req.params.id);
    if (!fetchedNiveau) {
        res.status(400).json({message : "Niveau non existante" });
    }

    await Niveau.destroy({where:{code_niveau: req.params.id}});
    res.status(200).json({message : `Niveau ${fetchedNiveau.niveau_libelle} supprimée`});

    })


module.exports = {
    getAllNiveau,
    getOneNiveau,
    postNiveau,
    updateNiveau,
    deleteNiveau,
}