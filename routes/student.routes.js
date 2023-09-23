const express = require('express');
const router = express.Router();
const db = require('../config/db.config');
const { getAllStudents, getOneStudent, postStudent, updateStudent, deleteStudent } = require('../controllers/student.controller');
const { upload } = require('../middlewares/uploadImgMiddleware');


router.route('/').get(getAllStudents).post(upload, postStudent)
router.route('/:id').get(getOneStudent).put(updateStudent).delete(deleteStudent)
module.exports = router;