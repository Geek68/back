const db = require('../models')
const {Etudiant, Personne} = db
const asyncHandler = require('express-async-handler')
const { Op } = require('sequelize')
const fs = require('fs')


//@desc get all students
//@route GET /api/students
//@acces Private
const getAllStudents = asyncHandler(async (req, res) => {

    const etudiants = await Etudiant.findAll()

    res.status(200).json(students)
}
)

//@desc get one student
//@route GET /api/students/:id
//@acces Private
const getOneStudent = asyncHandler(async (req, res) => {
    const etudiant = await Etudiant.findByPk(req.params.id,{
        include: {
            model: Personne
        }
    })
    if (!etudiant) {
        res.status(400).json({
            message: 'Etudiant non existant'
        })
    }

    res.status(200).json(etudiant)

})


const postStudent = asyncHandler(async (req, res) => {
    const { lastname, firstname, cin, email, phone, course, level, birth_place, birth_date } = req.body

    const fetchedStudent = await Student.findOne({ where:{[Op.or]: [{ cin }, {phone}, {email}
    ]}
})

    if (fetchedStudent) {
        res.status(400).json({message: "Etudiant déja existant"})
    } else {
        const student = await Student.create({
            lastname, 
            firstname, 
            cin, 
            email, 
            phone, 
            course, 
            level, 
            birth_place, 
            birth_date,
            profile_pic: req.file.path
        })

        res.status(200).json({
            'message': "Etudiant ajouté avec succès.",
            'student': student
        })
    }
})

    //@desc update a student
    //@route PUT /api/students/:id
    //@acces Private
    const updateStudent = asyncHandler(async (req, res) => {
        const { lastname, firstname, cin, email, phone, course, level, birth_place, birth_date } = req.body
        const fetchedStudent = await Student.findByPk(req.params.id)
        
        if (!fetchedStudent) {
            res.status(400).json({message : 'this student does not exist'})
        }
        
                await Student.update({
                    lastname, 
                    firstname, 
                    cin, 
                    email, 
                    phone, 
                    course, 
                    level, 
                    birth_place, 
                    birth_date,
                },{ where : {
                    student_code : req.params.id
                }

                
                }
                ).then(() => {
                    fs.unlinkSync(fetchedStudent.profile_pic)
                    res.status(200).send('Etudiant modifié')
                }).catch(err => {
                    res.status(500).json({message: err.parent.detail})
                })   

    })

    const deleteStudent = asyncHandler(async (req,res)=>{
        const fetchedStudent = await Student.findByPk(req.params.id);
    if (!fetchedStudent) {
        res.status(400).json({message : "this student does not exist" });
    }

    await Student.destroy({where:{student_code: req.params.id}});
    fs.unlinkSync(fetchedStudent.profile_pic)
    res.status(200).json({message : `Etudiant ${fetchedStudent.name} supprimé`});

    })

    const getPromotion = asyncHandler(async (req,res)=> {
        const promotion = await Student.findAll({
            where : {
                niveauId : req.body.niveauId
            }
        }).then(()=> {
            res.status(200).json(promotion)
        }).catch(err =>{
            res.status(500).json(err.parent.detail)
        })
    
    })

    const updateStudentPic = async (req, res) => {
        let { id } = req.params
        const fetchedStudent = await Student.findByPk(id)
        
        await Student.update({
            profil_pic: req.file.path,
        }, {
            where: { id: id }
        })
        .then(_ => {
            if(fs.existsSync(fetchedStudent.profil_pic)){        
                fs.unlinkSync(fetchedStudent.profil_pic)
            }
            Student.findByPk(id).then(student => res.status(200).json({ data: student, message: 'Student updated' }))
        })
        .catch(err => {
            console.error(err)
            res.status(500).json({ message: err })
        })
    }

module.exports = {
    getAllStudents,
    getOneStudent,
    postStudent,
    updateStudent,
    deleteStudent,
    getPromotion,
    updateStudentPic
}