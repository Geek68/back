const express = require('express');
const router = express.Router();
const db = require('../config/db.config');
const { getAllAbsence, getOneAbsence, postAbsence, updateAbsence, deleteAbsence } = require('../controllers/absence.controller');


router.route('/').get(getAllAbsence).post(postAbsence).delete(deleteAbsence)
router.route('/:id').get(getOneAbsence).put(updateAbsence)
module.exports = router;