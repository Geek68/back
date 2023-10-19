const express = require('express');
const router = express.Router();
const db = require('../config/db.config');
const { getAllStudents, getOneStudent, postStudent, updateStudent, deleteStudent, getPromotion } = require('../controllers/student.controller');
const { upload } = require('../middlewares/uploadImgMiddleware');


router.route('/').get(getAllStudents).post(upload, postStudent)
router.route('/:id').get(getOneStudent).put(upload, updateStudent).delete(deleteStudent)
router.route('/promotion').get(getPromotion)
module.exports = router;