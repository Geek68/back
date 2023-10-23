const { CreateUserAccount, DeleteUserAccount } = require('../controllers/userAccount.controller');
const fs = require('fs');
const reader = require ('xlsx')

const db = require('../models')

const { Prof, Matiere, Seance, UserAccount } = db


const InitCreateProf = async (req, res) => {
    const datas = []
    try{
        const file = reader.readFile(req.file.destination+'/'+req.file.filename)
        const sheetNames = file.SheetNames

        if(sheetNames.length == 0){
            res.status(200).json({message: 'Aucun nouveau élèment disponible'})
        }
        for(let i = 0; i<sheetNames.length; i++){
            const arr = reader.utils.sheet_to_json(
                file.Sheets[sheetNames[i]]
            )

            arr.forEach((res) => {
                datas.push(res)
            })
        }
        fs.unlinkSync(req.file.destination+'/'+req.file.filename)
        await Prof.bulkCreate(datas,{ignoreDuplicates: true})
        .then( prof => {
            prof.forEach(p =>{
                if(p.id != null){
                    CreateUserAccount(p.firstname, p.lastname, p.id)
                }
            })
            res.status(201).json({message: 'Data Uploaded', data:prof})
        })
        .catch( err => res.status(500).json({message: err}) )
    }catch(err){
        res.status(500).json({message: err})
    }
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
    let { id } = req.params
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
    const { lastname, firstname, title, email, phone } = req.body
    const fetchedProf = await Prof.findByPk(id)

    if (!fetchedProf) {
        res.status(400).json({message : 'this Prof does not exist'})
    }
        
    await Prof.update({
        firstname, 
        lastname, 
        title, 
        email, 
        phone
    }, {
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

const UpadteProfProfPic = async (req, res) => {
    let { id } = req.params
    const fetchedProf = await Prof.findByPk(id)
    
    await Prof.update({
        profil_pic_path: req.file.path,
    }, {
        where: { id: id }
    })
    .then(_ => {
        if(fs.existsSync(fetchedProf.profil_pic_path)){        
            fs.unlinkSync(fetchedProf.profil_pic_path)
        }
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
    InitCreateProf,
    FindProf,
    FindProfById,
    UpdateProf,
    DeleteProf,
    UpadteProfProfPic
}