const express = require('express');
const router = express.Router();
const db = require('../config/db');
const Student = require('../models/Student');
const { getAllStudents, getOneStudent, postStudent, updateStudent, deleteStudent } = require('../controllers/studentController');

router.route('/').get(getAllStudents).post(postStudent)
router.route('/:id').get(getOneStudent).put(updateStudent).delete(deleteStudent)
module.exports = router;