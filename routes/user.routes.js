const express = require('express');
const router = express.Router();
const { CreateUserAccount, FindUserAccountById, FindUserAccount, ChangePasswordAccount, UpdateUserAccountInfo, DeleteUserAccount } = require('../controllers/userAccount.controller');

router.route('/').get(FindUserAccount).post(CreateUserAccount)
router.route('/:id').get(FindUserAccountById).put(UpdateUserAccountInfo).delete(DeleteUserAccount)
router.route('/changepassword/:id').put(ChangePasswordAccount)

module.exports = router;