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
            res.status(200).json({statusCode: 'OK', message: 'Aucun nouveau élèment disponible'})
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

        try{
            const currentCountRows = await Prof.count()
            const bulkCreateProf = Bc(datas)

            Promise.all(bulkCreateProf).then(async()=>{
                const NewCountRows = await Prof.count()
                const rowsAffected = NewCountRows - currentCountRows
                rowsAffected > 0 ? 
                res.status(201).json({statusCode: 'OK', message: `${rowsAffected} rows affected`}) :
                res.status(200).json({statusCode: 'OK', message: 'No necessary rows to upload'})
            })
        }catch(err){
            console.error(err)
            res.status(500).json({message: "An error occured"})
        }
    }catch(err){
        console.error(err)
        res.status(500).json({message: err.stack})
    }
}

const Bc = (datas)=>{
    const bc = datas.map(async data => {
        const {photo_prof, nom, prenoms, titre, fonction, email, telephone} = data
        const fetchedPerson = await Personne.findOne({
            include: {
                model: Prof
            },
            where: { [Op.and]: [{ nom }, { prenoms }] }
        })
        
        if(fetchedPerson){
            return
        }else{
            await Prof.create({
                    titre : titre,
                    fonction : fonction,
                    photo_prof : photo_prof,
                    Personne : {
                        nom : nom,
                        prenoms : prenoms,
                        telephone : `+${telephone}`,
                        email : email,
                    }                       
            },{
                include: Personne
            }).then(prof => {
                CreateUserAccount(prof.Personne.nom, prof.Personne.prenoms, prof.code_prof)                      
            })
        }
    })

    return bc
}

const FindProf = async (req, res) => {
    await Prof.findAll({
        include: [
        {
            model: Personne
        },
        {
            model: UserAccount
        },
    {
        model: TrancheHoraire
    }]
    })
    .then(profs => res.json({profs : profs}))
    .catch(err => res.status(500).json({message: err}))
}


const CreateProf = async (req, res) => {
    const { nom, prenoms, 
        telephone, email, titre, fonction } = req.body
        
        await Personne.findOne({
            include: {
                model: Prof
            },
            where: { [Op.or]: [{ telephone : `+${telephone}` }, { email }] }
        })
        .then(async _p => {
            if(_p){
                res.status(400).json({message : 'Cette personne deja existant'})
                req.file && fs.unlinkSync(req.file.path)
            }else{
                await Prof.create({
                        titre,
                        fonction,
                        photo_prof : req.file ? req.file.path : null,
                        Personne : {
                            nom,
                            prenoms,
                            telephone : `+${telephone}`,
                            email,

                        }   
                
                },{
                    include: Personne
                }).then(prof => {
                        res.status(201).json({message: `${prof.Personne.nom} ${prof.Personne.prenoms} a été enregistré dans la base de données`, data:prof})
                        CreateUserAccount(prof.Personne.nom, prof.Personne.prenoms, prof.code_prof)
                }).catch(err =>{
                    console.error(err)
                    res.status(500).json({message: err.parent.detail})
                })
            
            }
        }).catch(err => {
            req.file && fs.unlinkSync(req.file.path)
            res.status(500).json({message: err})
        })

}

const FindProfById = async (req, res) => {
    let { id } = req.params
    const prof = await Prof.findByPk(id, {
        include: [
            {
                model: Personne
            },
            {
                model: UserAccount
            },
        {
            model: TrancheHoraire
        }]
    }).then(prof => prof ? res.status(200).json(prof) : res.status(404).json({ message: 'prof not found' })
    ).catch(err => {
        console.error(err)
        res.status(500).json({ message: err })
    })
}

const UpdateProfBasicInfo = async (req, res) => {
    const { nom, prenoms, 
        telephone, email, titre, fonction } = req.body  
        const fetchedProf = await Prof.findByPk(req.params.id)

    if (!fetchedProf) {
        res.status(400).json({message : 'this Prof does not exist'})
    } else {
        Prof.update({
            titre,
            fonction,
          
        },{ where : {
            code_prof : req.params.id
        }
    
        
        })
        .then(async () => {
         
            Personne.update({
                nom, prenoms, email, telephone
            }, { where : {
                id_personne : fetchedProf.personneId
            }
        
            }).then(() => {
                res.status(200).json({
                    message: `Prof modifié avec succès`
                })
            })
        })
        .catch(err => {
            console.error(err)
            res.status(500).json({ message: err })
        })
    }
}


const UpdateProfAccountInfo = async (req, res) => {
    const { login } = req.body  
        const fetchedProf = await Prof.findByPk(req.params.id)
    if (!fetchedProf) {
        res.status(400).json({message : 'this Prof does not exist'})
    } else {
        UserAccount.update({
            login,
        },{ where : {
            profId : req.params.id
        }
        })
        .then(() => {
            res.status(200).json({
                message: `Information de connexion modifiée avec succès`
            })
        })
        .catch(err => {
            console.error(err)
            res.status(500).json({ message: err })
        })
    }
}

const UpadteProfPic = async (req, res) => {
    let { id } = req.params
    const fetchedProf = await Prof.findByPk(id)
    
    await Prof.update({
        photo_prof: req.file.path,
    }, {
        where: { code_prof: id }
    })
    .then(_ => {
        if(fs.existsSync(fetchedProf.photo_prof)){        
            fs.unlinkSync(fetchedProf.photo_prof)
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
        include: [{ model : UserAccount},{model: Personne}]
    })
    if(!fetchedProf){
        res.status(400).json({message : "this Prof does not exist"});
    }
    else{
        await Prof.destroy({
            where : {code_prof : id}
        }).then(async _ => {
            await Personne.destroy({
                where : {id_personne : fetchedProf.Personne.id_personne}
            })
            if(fs.existsSync(fetchedProf.photo_prof)){        
                fs.unlinkSync(fetchedProf.photo_prof)
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
    UpdateProfBasicInfo,
    UpdateProfAccountInfo,
    DeleteProf,
    UpadteProfPic
}