const express = require('express');
const router = express.Router();
const db = require('../config/db.config');
const { getAllSeance, getOneSeance, postSeance, updateSeance, deleteSeance } = require('../controllers/seance.controller');


router.route('/').get(getAllSeance).post( postSeance)
router.route('/:id').get(getOneSeance).put( updateSeance).delete(deleteSeance)
module.exports = router;