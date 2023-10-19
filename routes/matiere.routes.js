const express = require('express');
const router = express.Router();
const db = require('../config/db.config');
const { getAllMatiere, getOneMatiere, postMatiere, updateMatiere, deleteMatiere, getMatierByProfId } = require('../controllers/matiere.controller');


router.route('/').get(getAllMatiere).post(postMatiere)
router.route('/:id').get(getOneMatiere).put(updateMatiere).delete(deleteMatiere).get(getMatierByProfId)
module.exports = router;