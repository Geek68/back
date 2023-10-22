const { CreateUserAccount, DeleteUserAccount } = require('../controllers/userAccount.controller');

const db = require('../models')

const { Prof, Matiere, Seance, UserAccount } = db


const CreateProf = async (req, res) => {
    let { firstname, lastname, phone, title, email } = req.body
    Prof.findOne({
        where: { phone: phone }
    }).then(async _p => {
        if (_p) {
            res.status(401).json({ message: 'Prof already registered' })
        }
        await Prof.create({
            firstname: firstname,
            lastname: lastname,
            phone: phone,
            email: email,
            title: title,
        }).then(prof => {
            res.status(201).json({message: `${prof.firstname} ${prof.lastname} a été enregistré dans la base de données`, data:prof})
            CreateUserAccount(firstname, lastname, prof.id)
        }).catch(err =>{
            console.error(err)
            res.status(500).json({ message: err })
        })
         
           
        
    }).catch(err => res.status(500).json({ message: err }))
}

const FindProf = async (req, res) => {
    await Prof.findAll({
        include: [{
            model: Matiere
        },
        {
            model: Seance
        },
        {
            model: UserAccount
        }]
    })
    .then(profs => res.json({profs : profs}))
    .catch(err => res.status(500).json({message: err}))
}

const FindProfById = async (req, res) => {
    let { id } = req.params.id
    const prof = await Prof.findByPk(id, {
        include: [{
            model: Matiere
        },
        {
            model: Seance
        },
        {
            model: UserAccount
        }]
    }).then(prof => prof ? res.status(200).json(prof) : res.status(404).json({ message: 'prof not found' })
    ).catch(err => {
        console.error(err)
        res.status(500).json({ message: err })
    })
}

const UpdateProf = async (req, res) => {
    let { id } = req.params
    await Prof.update(req.body, {
        where: { id: id }
    })
        .then(_ => {
            Prof.findByPk(id).then(prof => res.status(200).json({ data: prof, message: 'Prof updated' }))
        })
        .catch(err => {
            console.error(err)
            res.status(500).json({ message: err })
        })
}

const DeleteProf = async (req, res) => {
    let { id } = req.params
    const prof = await Prof.findByPk(id,{
        include: UserAccount
    })
    await Prof.destroy({
        where : {id : id}
    }).then(response => {
        res.status(200).json({message: 'Prof deleted'})
        DeleteUserAccount(prof.UserAccount.id)
    })
}




module.exports = {
    CreateProf,
    FindProf,
    FindProfById,
    UpdateProf,
    DeleteProf,

}