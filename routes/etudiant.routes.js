const express = require('express');
const router = express.Router();
const db = require('../config/db.config');
const { getAllEtudiants, getOneEtudiant, postEtudiant, updateEtudiant, deleteEtudiant, getPromotion, updateEtudiantPic, InitCreateEtudiant } = require('../controllers/etudiant.controller');
const { upload } = require('../middlewares/uploadImgMiddleware');
const { uploadXlsxFile } = require('../middlewares/uploadExcelFile');


router.route('/').get(getAllEtudiants).post(upload, postEtudiant)
router.route('/:id').get(getOneEtudiant).put(updateEtudiant).delete(deleteEtudiant)
router.route('/promotion').post(getPromotion)
router.route('/updateEtudiantPic/:id').put(upload, updateEtudiantPic)
router.route('/uploadEtudiant').post(uploadXlsxFile, InitCreateEtudiant)


module.exports = router;