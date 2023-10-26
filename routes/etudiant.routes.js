const express = require('express');
const router = express.Router();
const db = require('../config/db.config');
const { getAllStudents, getOneStudent, postStudent, updateStudent, deleteStudent, getPromotion, updateStudentPic } = require('../controllers/etudiant.controller');
const { upload } = require('../middlewares/uploadImgMiddleware');


router.route('/').get(getAllStudents).post(upload, postStudent)
router.route('/:id').get(getOneStudent).put(upload, updateStudent).delete(deleteStudent)
router.route('/promotion').get(getPromotion)
router.route('/updateStudentPic/:id').put(upload, updateStudentPic)

module.exports = router;