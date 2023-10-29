const db = require('../models')
const { Etudiant, Personne, Inscrit, TrancheHoraire, Absence, Groupe, Niveau, Personne_Groupe, AnneeUniversitaire } = db
const asyncHandler = require('express-async-handler')
const { Op } = require('sequelize')
const fs = require('fs')


const InitCreateEtudiant = async (req, res) => {
  const datas = []
  const {niveauId, anneeUniversitaireId} = req.body
  try{
      const file = reader.readFile(req.file.destination+'/'+req.file.filename)
      const sheetNames = file.SheetNames

      if(sheetNames.length == 0){
          res.status(200).json({message: 'Aucun nouveau élèment disponible'})
      }

      for(let i = 0; i<sheetNames.length; i++){
          const arr = reader.utils.sheet_to_json(
              file.Sheets[sheetNames[i]]
          )

          arr.forEach((res) => {
              datas.push(res)
          })
      }
      fs.unlinkSync(req.file.destination+'/'+req.file.filename)
      datas.push(niveauId)
      datas.push(anneeUniversitaireId)
      try{
          bulkCreateEtudiant(datas)
          res.status(201).json({message: 'Data Uploaded'})
      }catch(err){
          res.status(500).json({message: "An error occured"})
      }
  }catch(err){
      res.status(500).json({message: err})
  }
}

const bulkCreateEtudiant = (datas)=>{
  datas.forEach(async data => {
    const { nom, prenoms, date_naissance, lieu_naissance, cin, date_delivranceCIN, lieu_delivranceCIN,
      telephone, email, sexe, situation_matrimoniale, adresse, nationalite, numero_inscription, niveauId, anneeUniversitaireId, numero_passeport, code_redoublement  } = data
        await Personne.findOne({
          include: {
              model: Etudiant
          },
          where: { [Op.or]: [{ telephone : `+${telephone}` }, { email }] }
      }).then(async _p => {
          if(_p){
              return
          }else{
            await Inscrit.create({
              Etudiant: {
                nationalite,
                numero_passeport,
                date_naissance,
                lieu_naissance,
                cin,
                numero_inscription,
                date_delivranceCIN,
                lieu_delivranceCIN,
                situation_matrimoniale,
                sexe,
                adresse,
                Personne: {
                  nom,
                  prenoms,
                  telephone,
                  email,
                }
              },
        
              niveauId,
              anneeUniversitaireId,
              code_redoublement,
              photo_etudiant: req.file.path
        
            }, {
              include: [{
                model: Etudiant,
                include: { model: Personne }
              }]
            }).then(etudiant => {
              console.log({message: `Etudiant ${etudiant.Personne.nom} crée`})
              })
          }
      })
  })
}






//@desc get all Etudiants
//@route GET /api/Etudiants
//@acces Private
const getAllEtudiants = asyncHandler(async (req, res) => {


  const etudiants = await Etudiant.findAll({
    include: [
      {
        model: Personne,
        include: {
          model: Groupe,
          include: {
            model: TrancheHoraire
          }
        }
      },

      {
        model: Inscrit,
        include: [{
          model: Niveau
        },
        { model: AnneeUniversitaire }]
      }


    ]
  })

  res.status(200).json(etudiants)
}
)

//@desc get one Etudiant
//@route GET /api/Etudiants/:id
//@acces Private
const getOneEtudiant = asyncHandler(async (req, res) => {
  const etudiant = await Etudiant.findByPk(req.params.id, {
    include: [
      {
        model: Personne,
        include: {
          model: Groupe,
          include: {
            model: TrancheHoraire
          }
        }
      },

      {
        model: Inscrit,
        include: [{
          model: Niveau
        },
        { model: AnneeUniversitaire }]
      }


    ]
  })
  if (!etudiant) {
    res.status(400).json({
      message: 'Etudiant non existant'
    })
  }

  res.status(200).json(etudiant)

});

const postEtudiant = asyncHandler(async (req, res) => {
  const { nom, prenoms, date_naissance, lieu_naissance, cin, date_delivranceCIN, lieu_delivranceCIN,
    telephone, email, sexe, situation_matrimoniale, adresse, nationalite, numero_inscription, numero_passeport, niveauId, code_redoublement, anneeUniversitaireId } = req.body

  try {
    await Inscrit.create({
      Etudiant: {
        nationalite,
        numero_passeport,
        date_naissance,
        lieu_naissance,
        cin,
        numero_inscription,
        date_delivranceCIN,
        lieu_delivranceCIN,
        situation_matrimoniale,
        sexe,
        adresse,
        Personne: {
          nom,
          prenoms,
          telephone,
          email,
        }
      },

      niveauId,
      anneeUniversitaireId,
      code_redoublement,
      photo_etudiant: req.file.path

    }, {
      include: [{
        model: Etudiant,
        include: { model: Personne }
      }]
    }).then(inscrit => {
      res.status(201).json({ message: `${inscrit.Etudiant.Personne.nom} ${inscrit.Etudiant.Personne.prenoms} a été inscrit dans la base de données`, data: inscrit })

    }).catch(err => {
      console.error(err)
      res.status(500).json({ message: err.parent.detail })
    })
  } catch (error) {
    res.status(500).json({ message: error })
  }




})

//@desc update a Etudiant
//@route PUT /api/Etudiants/:id
//@acces Private
const updateEtudiant = asyncHandler(async (req, res) => {
  let { id } = req.params
  const { nom, prenoms, date_naissance, lieu_naissance, cin, date_delivranceCIN, lieu_delivranceCIN,
    telephone, email, sexe, situation_matrimoniale, adresse, nationalite, numero_inscription, numero_passeport, niveauId, code_redoublement, anneeUniversitaireId } = req.body 
        const fetchedEtudiant = await Etudiant.findByPk(id)

    if (!fetchedEtudiant) {
        res.status(400).json({message : 'this etudiant does not exist'})
    }
        
    await Inscrit.update({
        
        nationalite,
        numero_passeport,
        date_naissance,
        lieu_naissance,
        cin,
        numero_inscription,
        date_delivranceCIN,
        lieu_delivranceCIN,
        situation_matrimoniale,
        sexe,
        adresse,
        Personne: {
          nom,
          prenoms,
          telephone,
          email,
        },
   
        niveauId,
        anneeUniversitaireId,
        code_redoublement, 
      

      
    },{
        where: { etudiantId: id }
    },{include: [{
      model: Etudiant,
      include: { model: Personne }
    }]})
    .then(_ => {
        Etudiant.findByPk(id,{
            include : {
                model: Personne
            }
        }).then(etudiant => res.status(200).json({ data: etudiant, message: 'Etudiant updated' }))
    })
    .catch(err => {
        console.error(err)
        res.status(500).json({ message: err })
    })

});

const deleteEtudiant = asyncHandler(async (req, res) => {
  let { id } = req.params
    const fetchedEtudiant = await Etudiant.findByPk(id,{
        include: [{model: Personne}]
    })
    if(!fetchedEtudiant){
        res.status(400).json({message : "this Etudiant does not exist"});
    }
    else{
        await Etudiant.destroy({
            where : {id_etudiant : id}
        }).then(async _ => {
            await Personne.destroy({
                where : {id_personne : fetchedEtudiant.Personne.id_personne}
            })
            if(fs.existsSync(fetchedEtudiant.photo_etudiant)){        
                fs.unlinkSync(fetchedEtudiant.photo_etudiant)
            }
            res.status(200).json({message: 'Etudiant deleted'})
        })
    }
});

const getPromotion = asyncHandler(async (req, res) => {
  const promotion = await Etudiant.findAll({
    where: {
      niveauId: req.body.niveauId,
    },
  })
    .then(() => {
      res.status(200).json(promotion);
    })
    .catch((err) => {
      res.status(500).json(err.parent.detail);
    });
});

const updateEtudiantPic = async (req, res) => {
  let { id } = req.params;
  const fetchedEtudiant = await Etudiant.findByPk(id);

  await Etudiant.update(
    {
      photo_etudiant: req.file.path,
    },
    {
      where: { id: id },
    }
  )
    .then((_) => {
      if (fs.existsSync(fetchedEtudiant.Etudiantil_pic)) {
        fs.unlinkSync(fetchedEtudiant.Etudiantil_pic);
      }
      Etudiant.findByPk(id).then((Etudiant) =>
        res.status(200).json({ data: Etudiant, message: "Etudiant updated" })
      );
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err });
    });
};

module.exports = {
  getAllEtudiants,
  getOneEtudiant,
  postEtudiant,
  updateEtudiant,
  deleteEtudiant,
  getPromotion,
  updateEtudiantPic,
};
