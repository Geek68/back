const express = require('express');
const router = express.Router();
const { CreateProf, FindProfById, FindProf, UpdateProf, DeleteProf } = require('../controllers/prof.controller');

router.route('/').get(FindProf).post(CreateProf)
router.route('/:id').get(FindProfById).put(UpdateProf).delete(DeleteProf)
// router.route('/:id/mymatieres').get(getMatierByProfId)


module.exports = router;