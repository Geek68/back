const db = require('../models')
const {EC,Niveau,Prof, Personne, TrancheHoraire} = db
const asyncHandler = require('express-async-handler')



const getAllEC = asyncHandler(async (req, res) => {

    const ECs = await EC.findAll({
        order:[['code_element', 'ASC']],

        include: [
        {
            model: Niveau
        },
        {
            model: TrancheHoraire,
            include : {
                model: Prof,
                include : {
                    model: Personne
                }
            }
        }
       ]
    })

    res.status(200).json(ECs)
}
)


const getOneEC = asyncHandler(async (req, res) => {
    const ec = await EC.findByPk(req.params.id,{
        include: [
            {
                model: Niveau
            },
            {
                model: TrancheHoraire,
                include : {
                    model: Prof,
                    include : {
                        model: Personne
                    }
                }
            }
           ]
    })

    if (!ec) {
        res.status(400).json({
            message: 'EC non existant'
        })
    }

    res.status(200).json(ec)

})


const postEC = asyncHandler(async (req, res) => {
    const { nom_element, niveauId  } = req.body

    const fetchedEC = await EC.findOne({ where: {nom_element} })

    if (fetchedEC) {
        res.status(400).json({message: "EC déja existant"})
    } else {
        const ec = await EC.create({
            nom_element,
            niveauId: niveauId || niveauId!=0 ? niveauId : null
        }).then(EC => {
            res.status(200).json({
                'message': "EC ajouté avec succès.",
                'EC': EC
            })
        })
    }
})

    const updateEC = asyncHandler(async (req, res) => {
        const { nom_element, niveauId } = req.body
        const fetchedEC = await EC.findByPk(req.params.id)
        
        if (!fetchedEC) {
            res.status(400).json({message : 'EC non existante'})
        }
        
                await EC.update({
                    nom_element,
                    niveauId: niveauId || niveauId!=0 ? niveauId : null
                },{ where : {
                    code_element : req.params.id
                }

                
                }
                ).then(() => {
                    
                    res.status(200).json({message : `Element constitutif ${req.params.id} modifié`})
                }).catch(err => {
                    res.status(500).json({message: err.parent.detail})
                })   

    })

    const deleteEC = asyncHandler(async (req,res)=>{
        const fetchedEC = await EC.findByPk(req.params.id);
    if (!fetchedEC) {
        res.status(400).json({message : "EC non existante" });
    }

    await EC.destroy({where:{code_element: req.params.id}});
    res.status(200).json({message : `EC ${fetchedEC.nom_element} supprimée`});

    })
    




module.exports = {
    getAllEC,
    getOneEC,
    postEC,
    updateEC,
    deleteEC,
}