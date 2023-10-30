const express = require('express');
const router = express.Router();
const db = require('../config/db.config');
const { getAllTrancheHoraire, getOneTrancheHoraire, postTrancheHoraire, updateTrancheHoraire, deleteTrancheHoraire, getTrancheHoraireByGroup, getTrancheHoraireByProf } = require('../controllers/tranchehoraire.controller');


router.route('/').get(getAllTrancheHoraire).post( postTrancheHoraire)
router.route('/:id').get(getOneTrancheHoraire).put( updateTrancheHoraire).delete(deleteTrancheHoraire)
router.route('/bygroup/:groupeId').get(getTrancheHoraireByGroup)
router.route('/byprof/:profId').get(getTrancheHoraireByProf)
module.exports = router;