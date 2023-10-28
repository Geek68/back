const express = require('express');
const router = express.Router();
const db = require('../config/db.config');
const { getAllGroupe, getOneGroupe, postGroupe, updateGroupe, deleteGroupe } = require('../controllers/groupe.controller');


router.route('/').get(getAllGroupe).post(postGroupe)
router.route('/:id').get(getOneGroupe).put(updateGroupe).delete(deleteGroupe)
module.exports = router;