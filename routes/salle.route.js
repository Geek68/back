const express = require('express');
const router = express.Router();
const db = require('../config/db.config');
const { getAllSalle, getOneSalle, postSalle, updateSalle, deleteSalle } = require('../controllers/salle.controller');


router.route('/').get(getAllSalle).post(postSalle)
router.route('/:id').get(getOneSalle).put(updateSalle).delete(deleteSalle)
module.exports = router;