const express = require('express');
const router = express.Router();
const { InitCreateProf, FindProfById, FindProf, UpdateProfBasicInfo, UpdateProfAccountInfo, DeleteProf, UpadteProfPic, CreateProf } = require('../controllers/prof.controller');
const { uploadXlsxFile } = require('../middlewares/uploadExcelFile')
const { upload } = require('../middlewares/uploadImgMiddleware');

router.route('/').get(FindProf).post(upload, CreateProf)
router.route('/uploadProf').post(uploadXlsxFile, InitCreateProf)
router.route('/updateProfPic/:id').put(upload, UpadteProfPic)
router.route('/updateProfBasicInfo/:id').put(UpdateProfBasicInfo)
router.route('/updateProfAccountInfo/:id').put(UpdateProfAccountInfo)
router.route('/:id').get(FindProfById).delete(DeleteProf)


module.exports = router;