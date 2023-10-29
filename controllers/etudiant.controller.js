const db = require('../models')
const { Etudiant, Personne, Inscrit, TrancheHoraire, Absence, Groupe, Niveau, Personne_Groupe, AnneeUniversitaire } = db
const asyncHandler = require('express-async-handler')
const { Op } = require('sequelize')
const fs = require('fs')


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
    telephone, email, sexe, situation_matrimoniale, adresse, nationalite, numero_passeport, niveauId, code_redoublement, anneeUniversitaireId } = req.body

try {
  await Inscrit.create({
    Etudiant: {
      nationalite,
      numero_passeport,
      date_naissance,
      lieu_naissance,
      cin,
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
  res.status(500).json({message: error})
}
    



})

//@desc update a Etudiant
//@route PUT /api/Etudiants/:id
//@acces Private
const updateEtudiant = asyncHandler(async (req, res) => {
  const {
    lastname,
    firstname,
    cin,
    email,
    phone,
    course,
    level,
    birth_place,
    birth_date,
  } = req.body;
  const fetchedEtudiant = await Etudiant.findByPk(req.params.id);

  if (!fetchedEtudiant) {
    res.status(400).json({ message: "this Etudiant does not exist" });
  }

  await Etudiant.update(
    {
      lastname,
      firstname,
      cin,
      email,
      phone,
      course,
      level,
      birth_place,
      birth_date,
    },
    {
      where: {
        Etudiant_code: req.params.id,
      },
    }
  )
    .then(() => {
      fs.unlinkSync(fetchedEtudiant.profile_pic);
      res.status(200).send("Etudiant modifié");
    })
    .catch((err) => {
      res.status(500).json({ message: err.parent.detail });
    });
});

const deleteEtudiant = asyncHandler(async (req, res) => {
  const fetchedEtudiant = await Etudiant.findByPk(req.params.id);
  if (!fetchedEtudiant) {
    res.status(400).json({ message: "this Etudiant does not exist" });
  }

  await Etudiant.destroy({ where: { Etudiant_code: req.params.id } });
  fs.unlinkSync(fetchedEtudiant.profile_pic);
  res
    .status(200)
    .json({ message: `Etudiant ${fetchedEtudiant.name} supprimé` });
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
      profil_pic: req.file.path,
    },
    {
      where: { id: id },
    }
  )
    .then((_) => {
      if (fs.existsSync(fetchedEtudiant.profil_pic)) {
        fs.unlinkSync(fetchedEtudiant.profil_pic);
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
