const db = require('../models')
const { Etudiant, Personne, Inscrit, TrancheHoraire, Absence, Groupe, Niveau, Personne_Groupe, AnneeUniversitaire } = db
const asyncHandler = require('express-async-handler')
const { Op } = require('sequelize')
const fs = require('fs')


const InitCreateEtudiant = async (req, res) => {
  console.log("\n\n\n", req.file, "\n\n\n")
  const datas = []
  try{
      const file = reader.readFile(req.file.destination+'/'+req.file.filename)
      const sheetNames = file.SheetNames

      if(sheetNames.length == 0){
          res.status(200).json({statusCode: 'OK', message: 'Aucun nouveau élèment disponible'})
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

      const niveauId = req.body.niveauId
      const anneeUniversitaireId = req.body.anneeUniversitaireId

      try{
          const currentCountRows = await Etudiant.count()
          const bulkCreateEtudiant = Bc(datas, niveauId, anneeUniversitaireId)

          Promise.all(bulkCreateEtudiant).then(async()=>{
              const NewCountRows = await Etudiant.count()
              const rowsAffected = NewCountRows - currentCountRows
              rowsAffected > 0 ? 
              res.status(201).json({statusCode: 'OK', message: `${rowsAffected} rows affected`}) :
              res.status(200).json({statusCode: 'OK', message: 'No necessary rows to update'})
          })
      }catch(err){
          console.error(err)
          res.status(500).json({message: "An error occured"})
      }
  }catch(err){
      console.error(err)
      res.status(500).json({message: err.stack})
  }
}

const Bc = (datas, niveauId, anneeUniversitaireId)=>{
  const bc = datas.map(async data => {
    const { nom, prenoms, date_naissance, lieu_naissance, cin, date_delivranceCIN, lieu_delivranceCIN,
      telephone, email, sexe, situation_matrimoniale, adresse, nationalite, numero_inscription, numero_passeport, code_redoublement } = data
      const fetchedPerson = await Personne.findOne({
          include: {
              model: Etudiant
          },
          where: { [Op.or]: [{ telephone : `+${telephone}` }, { email }] }
      })
      
      if(fetchedPerson){
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
          }).then(inscrit => {
            res.status(201).json({ message: `${inscrit.Etudiant.Personne.nom} ${inscrit.Etudiant.Personne.prenoms} a été inscrit dans la base de données`, data: inscrit })
      
          }).catch(err => {
            console.error(err)
            res.status(500).json({ message: err })
          })
        
      }
  })

  return bc
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
      res.status(500).json({ message: err })
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
    
    
    const fetchedEtudiant = await Etudiant.findOne({
          include:              
            {
              model: Inscrit,
              include : {
                model: Niveau
              } 
            },
            where: { id_etudiant : id }
        })
        

    if (!fetchedEtudiant) {
        res.status(400).json({message : 'this etudiant does not exist'})
    }
    
   
    await Etudiant.update({
        
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
      

      
    },{
        where: { id_etudiant: id }
    })
    .then(async () => {
       await Personne.update({
        nom, prenoms, email, telephone
       },{where : {id_personne : fetchedEtudiant.personneId}}).then(async()=>{
        await Inscrit.update({
          code_redoublement,
          niveauId,
          anneeUniversitaireId
        }, {where: { [Op.and]: [{ etudiantId : id }, { niveauId : fetchedEtudiant.Inscrits[0].niveauId }, {anneeUniversitaireId : fetchedEtudiant.Inscrits[0].anneeUniversitaireId}] }}).then(()=>{
          res.status(200).json({
            message: 'Etudiant modifié'
          })
        })
       }) 
    })
    .catch(err => {
        console.error(err)
        res.status(500).json({ message: err })
    })

});

const deleteEtudiant = asyncHandler(async (req, res) => {
  let { id } = req.params
    const fetchedEtudiant = await Etudiant.findByPk(id,{
        include: [{model: Personne}, {model: Inscrit}]
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
            await Inscrit.destroy({
              where : {etudiantId : id}
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
  InitCreateEtudiant
};
