const express = require('express');
const router = express.Router();
const { InitCreateProf, FindProfById, FindProf, UpdateProf, DeleteProf, UpadteProfProfPic } = require('../controllers/prof.controller');
const { uploadXlsxFile } = require('../middlewares/uploadExcelFile')
const { upload } = require('../middlewares/uploadImgMiddleware');

router.route('/').get(FindProf)
router.route('/uploadProf').post(uploadXlsxFile, InitCreateProf)
router.route('/updateProfilPic/:id').put(upload, UpadteProfProfPic)
router.route('/:id').get(FindProfById).put(UpdateProf).delete(DeleteProf)


module.exports = router;