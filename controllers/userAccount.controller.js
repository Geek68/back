const bcrypt = require('bcryptjs')
const db = require('../models')

const {UserAccount, Prof} = db

const CreateUserAccount = async(firstname, lastname, profId) => {
    console.log(firstname, lastname, profId)
    const passw = generateRadomPass()
    const login = `${firstname} ${lastname}`
    UserAccount.create({
        login,
        password: bcrypt.hashSync(passw, 8),
        profId: profId,
    }).then(UserAccount => {
        console.log("Account Created")
        // ETO MANDEFA MAIL 
        //passw sy login alefa message
        console.log('======>', passw, login)
    }).catch(err =>{
        console.error(err)
    })
}

const FindUserAccount = async(req, res) => {
    await UserAccount.findAll({
        include: {
            model: Prof
        }
    })
    .then(UserAccounts => res.json({UserAccounts : UserAccounts}))
    .catch(err => res.status(500).json({message: err}))
}

const FindUserAccountById = async(req, res) => {
    let {id} = req.params
    await UserAccount.findByPk(id, {
        include: {
            model: Prof
        }
    }).then(UserAccount => UserAccount ? res.status(200).json({data: UserAccount, message: 'UserAccount found'}) : res.status(404).json({message: 'UserAccount not found'})
    ).catch(err => {
        console.error(err)
        res.status(500).json({message: err})
    })
}

const UpdateUserAccountInfo = async(req, res) => {
    let {id} = req.params
    await UserAccount.update(req.body, {
        where : {id : id}
    })
    .then(_u => {
        res.status(200).json({message:'User account updated', data: _u})
    })
    .catch(err => {
        res.status(500).json({message: err})
    })
}


const ChangePasswordAccount = async(req, res) => {
    let {id} = req.params
    console.log(id)
    UserAccount.findByPk(id).then(async account => {
        if(account){
            if(bcrypt.compareSync(req.body.password,account.password)){
                await UserAccount.update({
                    password : bcrypt.hashSync(req.body.newpassword, 8)
                },{
                    where : {id : id}
                })
                .then(_ => {
                   res.status(200).json({message:'Password updated'})
                })
                .catch(err => {
                    console.error(err)
                    res.status(500).json({message: err})
                })
            }else{
                res.status(401).json({message: 'Invalid Password : The current password doesn\'t match to the last one'})
            }
        }else{
            res.status(404).json({message: 'User not found'})
        }
    }).catch(err => res.status(500).json({message: err}))
}

const DeleteUserAccount = async(profId) => {
    await UserAccount.destroy({
        where : {id : profId}
    }).then(response => console.log('UserAccount deleted'))
}


const generateRadomPass = () => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let passwordCharSet = ''
    for (let i = 0, n = charset.length; i < 8; ++i) {
        passwordCharSet += charset.charAt(Math.floor(Math.random() * n));
    }
    return passwordCharSet
}

module.exports = {
    CreateUserAccount,
    FindUserAccount,
    FindUserAccountById,
    ChangePasswordAccount,
    UpdateUserAccountInfo,
    DeleteUserAccount
}