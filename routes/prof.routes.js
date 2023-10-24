const express = require('express');
const router = express.Router();
const { InitCreateProf, FindProfById, FindProf, UpdateProf, DeleteProf, UpadteProfPic, CreateProf } = require('../controllers/prof.controller');
const { uploadXlsxFile } = require('../middlewares/uploadExcelFile')
const { upload } = require('../middlewares/uploadImgMiddleware');

router.route('/').get(FindProf).post(upload, CreateProf)
router.route('/uploadProf').post(uploadXlsxFile, InitCreateProf)
router.route('/updateProfPic/:id').put(upload, UpadteProfPic)
router.route('/:id').get(FindProfById).put(UpdateProf).delete(DeleteProf)


module.exports = router;