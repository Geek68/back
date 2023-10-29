const express = require('express');
const router = express.Router();
const db = require('../config/db.config');
const { getAllAnneeUniversitaire, getOneAnneeUniversitaire, postAnneeUniversitaire, updateAnneeUniversitaire, deleteAnneeUniversitaire } = require('../controllers/anneeUniversitaire.controller');


router.route('/').get(getAllAnneeUniversitaire).post(postAnneeUniversitaire)
router.route('/:id').get(getOneAnneeUniversitaire).put(updateAnneeUniversitaire).delete(deleteAnneeUniversitaire)
module.exports = router;