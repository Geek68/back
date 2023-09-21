const db = require('../models')

const {Prof} = db

const CreateProf = async(req, res) => {
    let {firstname, lastname, phone, title, cin} = req.body
    Prof.findOne({
        where : {cin : cin}
    }).then(async _p => {
        if(_p){
            res.status(401).json({message: 'Prof already registered'})
        }else{
            await Prof.create({
                firstname: firstname,
                lastname: lastname,
                phone: phone,
                title: title,
                cin: cin
            }).then(prof => {
                res.status(201).json({message: `${prof.firstname} ${prof.lastname} a été enregistré dans la base de données`, data:prof})
            }).catch(err =>{
                console.error(err)
                res.status(500).json({message: err})
            })        
        }
    }).catch(err => res.status(500).json({message: err}))
}

const FindProf = async(req, res) => {
    await Prof.findAll()
    .then(profs => res.json({profs : profs}))
    .catch(err => res.status(500).json({message: err}))
}

const FindProfById = async(req, res) => {
    let {id} = req.params
    await Prof.findByPk(id).then(prof => prof ? res.status(200).json({data: prof, message: 'Prof found'}) : res.status(404).json({message: 'prof not found'})
    ).catch(err => {
        console.error(err)
        res.status(500).json({message: err})
    })
}

const UpdateProf = async(req, res) => {
    let {id} = req.params
    await Prof.update(req.body,{
        where : {id : id}
    })
    .then(_ => {
        Prof.findByPk(id).then( prof => res.status(200).json({data: prof, message:'Prof updated'}))
    })
    .catch(err => {
        console.error(err)
        res.status(500).json({message: err})
    })
}

const DeleteProf = async(req, res) => {
    let {id} = req.params
    await Prof.destroy({
        where : {id : id}
    }).then(response => res.status(200).json({message: 'Prof deleted'}))
}


module.exports = {
    CreateProf,
    FindProf,
    FindProfById,
    UpdateProf,
    DeleteProf
}