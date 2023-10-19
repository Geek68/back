const express = require('express');
const router = express.Router();
const db = require('../config/db.config');
const { getAllParcours, getOneParcours, postParcours, updateParcours, deleteParcours } = require('../controllers/parcours.controller');


router.route('/').get(getAllParcours).post( postParcours)
router.route('/:id').get(getOneParcours).put( updateParcours).delete(deleteParcours)
module.exports = router;