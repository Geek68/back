const express = require('express');
const router = express.Router();
const db = require('../config/db.config');
const { getAllEtudiants, getOneEtudiant, postEtudiant, updateEtudiant, deleteEtudiant, getPromotion, updateEtudiantPic } = require('../controllers/etudiant.controller');
const { upload } = require('../middlewares/uploadImgMiddleware');


router.route('/').get(getAllEtudiants).post(upload, postEtudiant)
router.route('/:id').get(getOneEtudiant).put(upload, updateEtudiant).delete(deleteEtudiant)
router.route('/promotion').get(getPromotion)
router.route('/updateEtudiantPic/:id').put(upload, updateEtudiantPic)

module.exports = router;