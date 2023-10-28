const express = require('express');
const router = express.Router();
const db = require('../config/db.config');
const { getAllEC, getOneEC, postEC, updateEC, deleteEC } = require('../controllers/ec.controller');


router.route('/').get(getAllEC).post(postEC)
router.route('/:id').get(getOneEC).put(updateEC).delete(deleteEC)
module.exports = router;