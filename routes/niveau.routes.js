const express = require('express');
const router = express.Router();
const db = require('../config/db.config');
const { getAllNiveau, getOneNiveau, postNiveau, updateNiveau, deleteNiveau } = require('../controllers/niveau.controller');


router.route('/').get(getAllNiveau).post( postNiveau)
router.route('/:id').get(getOneNiveau).put( updateNiveau).delete(deleteNiveau)
module.exports = router;