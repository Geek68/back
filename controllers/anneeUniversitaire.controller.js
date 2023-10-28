const { Op, where } = require('sequelize')
const db = require('../models')
const {AnneeUniversitaire,AnneeUniversitaire_Semestre, Niveau,Prof, Personne, TrancheHoraire, Semestre} = db
const asyncHandler = require('express-async-handler')



const getAllAnneeUniversitaire = asyncHandler(async (req, res) => {

    const anneeUniversitaires = await AnneeUniversitaire_Semestre.findAll({
        include: [
            {   
                model: Semestre,
                include: {
                    model: TrancheHoraire
                } 
            },{
                model: AnneeUniversitaire
            }
           ]
    })

    res.status(200).json(anneeUniversitaires)
}
)


const getOneAnneeUniversitaire = asyncHandler(async (req, res) => {
    const anneeUniversitaire = await AnneeUniversitaire_Semestre.findAll({
        where: {
            anneeUniversitaireId: {
            [Op.eq]: req.params.id
          }
        },
        
        include: [
                {   
                    model: Semestre,
                    
                },{
                    model: AnneeUniversitaire
                }
               ]
        
      } )

    if (!anneeUniversitaire) {
        res.status(400).json({
            message: 'AnneeUniversitaire non existant'
        })
    }

    res.status(200).json(anneeUniversitaire)

})


const postAnneeUniversitaire = asyncHandler(async (req, res) => {
    const {  annee_debut, annee_fin  } = req.body

    const fetchedAnneeUniversitaire = await AnneeUniversitaire.findOne({  where: { [Op.and]: [{ annee_debut }, { annee_fin }] }
})

    if (fetchedAnneeUniversitaire) {
        res.status(400).json({message: "AnneeUniversitaire déja existant"})
    } else {
        await AnneeUniversitaire.create({
            annee_debut,
            annee_fin
        }).then(async anneeUniversitaire => {
            await Semestre.findAll().then(semestres => {
                semestres.forEach(semestre => {
                    db.AnneeUniversitaire_Semestre.create({
                        semestreId : semestre.id_semestre,
                        anneeUniversitaireId : anneeUniversitaire.id_anneeUniversitaire
                    }).then(()=>{
                        console.log('Année crée')
                    }).catch(err => {
                        console.log(err)
                    })
                });
            })
            res.status(201).json("Ajouté avec succès")
        })

        
    }
})

    const updateAnneeUniversitaire = asyncHandler(async (req, res) => {
        const { annee_debut, annee_fin } = req.body
        const fetchedAnneeUniversitaire = await AnneeUniversitaire.findByPk(req.params.id)
        
        if (!fetchedAnneeUniversitaire) {
            res.status(400).json({message : 'AnneeUniversitaire non existante'})
        }
        
                await AnneeUniversitaire.update({
                    annee_debut,
                    annee_fin
                   
                },{ where : {
                    id_anneeUniversitaire : req.params.id
                }

                
                }
                ).then(() => {
                    
                    res.status(200).json(`Année Universitaire ${req.params.id} modifié`)
                }).catch(err => {
                    res.status(500).json({message: err.parent.detail})
                })   

    })

    const deleteAnneeUniversitaire = asyncHandler(async (req,res)=>{
        const fetchedAnneeUniversitaire = await AnneeUniversitaire.findByPk(req.params.id);
    if (!fetchedAnneeUniversitaire) {
        res.status(400).json({message : "Année Universitaire non existante" });
    }

    await AnneeUniversitaire.destroy({where:{id_anneeUniversitaire: req.params.id}});
    res.status(200).json({message : `Année Universitaire ${fetchedAnneeUniversitaire.annee_debut}-${fetchedAnneeUniversitaire.annee_fin} supprimée`});

    })
    




module.exports = {
    getAllAnneeUniversitaire,
    getOneAnneeUniversitaire,
    postAnneeUniversitaire,
    updateAnneeUniversitaire,
    deleteAnneeUniversitaire,
}