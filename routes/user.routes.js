const express = require('express');
const router = express.Router();
const { FindUserAccountById, FindUserAccount, ChangePasswordAccount, UpdateUserAccountInfo } = require('../controllers/userAccount.controller');

router.route('/').get(FindUserAccount)
router.route('/:id').get(FindUserAccountById).put(UpdateUserAccountInfo)
router.route('/changepassword/:id').put(ChangePasswordAccount)

module.exports = router;