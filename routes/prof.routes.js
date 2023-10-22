const express = require('express');
const router = express.Router();
const { InitCreateProf, FindProfById, FindProf, UpdateProf, DeleteProf } = require('../controllers/prof.controller');
const { uploadXlsxFile } = require('../middlewares/uploadExcelFile')

router.route('/').get(FindProf)
router.route('/uploadProf').post(uploadXlsxFile, InitCreateProf)
router.route('/:id').get(FindProfById).put(UpdateProf).delete(DeleteProf)


module.exports = router;