const express = require('express');
const router = express.Router();
const db = require('../config/db');
const Student = require('../models/Student');
const Sequelize = require('sequelize');
const { getAllStudents, getOneStudent, postStudent } = require('../controllers/studentController');

router.route('/').get(getAllStudents).post(postStudent)
router.route('/:id').get(getOneStudent)
module.exports = router;