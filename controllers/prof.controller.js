const { CreateUserAccount, DeleteUserAccount } = require('../controllers/userAccount.controller');
const fs = require('fs')
const { Op } = require('sequelize')
const reader = require ('xlsx')

const db = require('../models')

const { Prof, Personne, EC, TrancheHoraire, UserAccount } = db


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
        include: [
        {
            model: TrancheHoraire
        },
        {
            model: UserAccount
        }]
    })
    .then(profs => res.json({profs : profs}))
    .catch(err => res.status(500).json({message: err}))
}


const CreateProf = async (req, res) => {
    const { nom, prenoms, date_naissance, lieu_naissance, cin, date_delivranceCIN, lieu_delivranceCIN,
        telephone, email, sexe, situation_matrimoniale, adresse, titre } = req.body
        
        await Personne.findOne({
            include: {
                model: Prof
            },
            where:{[Op.or]: [{telephone}, {email}, {cin}]}
        })
        .then(async _p => {
            console.log(_p)
            if(_p){
                res.status(400).json({message : 'Prof deja existant'})
                // fs.unlinkSync(req.file.path)
            }else{
                await Prof.create({
                        titre,
                        photo_prof : req.file.path,
                        Personne : {
                            nom, 
                            prenoms, 
                            date_naissance, 
                            lieu_naissance, 
                            cin, 
                            date_delivranceCIN, 
                            lieu_delivranceCIN,
                            telephone, 
                            email, 
                            sexe, 
                            situation_matrimoniale, 
                            adresse
                        }   
                
                },{
                    include: Personne
                }).then(prof => {
                        res.status(201).json({message: `${prof.Personne.nom} ${prof.Personne.prenoms} a été enregistré dans la base de données`, data:prof})
                        CreateUserAccount(prof.Personne.nom, prof.Personne.prenoms, prof.code_prof)
                    
                }).catch(err =>{
                    console.error(err)
                    res.status(500).json({message: err})
                })
            
            }
        }).catch(err => {
            // fs.unlinkSync(req.file.path)
            res.status(500).json({message: err})
        })

}

const FindProfById = async (req, res) => {
    let { id } = req.params
    const prof = await Prof.findByPk(id, {
        include: [
        {
            model: TrancheHoraire
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

const UpadteProfPic = async (req, res) => {
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
    const fetchedProf = await Prof.findByPk(id,{
        include: UserAccount
    })
    if(!fetchedProf){
        res.status(400).json({message : "this Prof does not exist" });
    }
    else{
        await Prof.destroy({
            where : {id : id}
        }).then(_ => {
            if(fs.existsSync(fetchedProf.profil_pic_path)){        
                fs.unlinkSync(fetchedProf.profil_pic_path)
            }
            DeleteUserAccount(fetchedProf.UserAccount.id)
            res.status(200).json({message: 'Prof deleted'})
        })
    }
}




module.exports = {
    InitCreateProf,
    CreateProf,
    FindProf,
    FindProfById,
    UpdateProf,
    DeleteProf,
    UpadteProfPic
}