const db = require('../models')
const {Student} = db
const asyncHandler = require('express-async-handler')
const { Op } = require('sequelize')
const fs = require('fs')


//@desc get all students
//@route GET /api/students
//@acces Private
const getAllStudents = asyncHandler(async (req, res) => {

    const students = await Student.findAll()

    res.status(200).json(students)
}
)

//@desc get one student
//@route GET /api/students/:id
//@acces Private
const getOneStudent = asyncHandler(async (req, res) => {
    const student = await Student.findByPk(req.params.id)
    if (!student) {
        res.status(400).json({
            'message': 'Etudiant non existant'
        })
        throw new Error('this student does not exist')
    }

    res.status(200).json(student)

})


const postStudent = asyncHandler(async (req, res) => {
    const { name, first_name, cin, email, phone_number, course, level, birth_place, birth_date } = req.body

    const fetchedStudent = await Student.findOne({ where:{[Op.or]: [{ cin: cin }, {phone_number: phone_number}, {email: email}
    ]}
})

    if (fetchedStudent) {
        res.status(400).json("Etudiant déja existant")
        throw new Error("Etudiant déja existant")
    } else {
        const student = await Student.create({
            name: name, 
            first_name: first_name, 
            cin: cin, 
            email: email, 
            phone_number: phone_number, 
            course: course, 
            level:level, 
            birth_place: birth_place, 
            birth_date: birth_date,
            profile_picture: req.file.path
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
        const fetchedStudent = await Student.findByPk(req.params.id)
        
        if (!fetchedStudent) {
            res.status(400)
            throw new Error('this student does not exist')
        }
        
                await Student.update(req.body,{ where : {
                    student_code : req.params.id
                }
                
                }
                ).then(() => {
                    res.status(200).send('Etudiant modifié')
                }).catch(err => {
                    res.send(err.parent.detail)
                })   

    })

    const deleteStudent = asyncHandler(async (req,res)=>{
        const fetchedStudent = await Student.findByPk(req.params.id);
    if (!fetchedStudent) {
        res.status(400);
        throw new Error("this student does not exist");
    }

    
    await Student.destroy({where:{student_code: req.params.id}});
    fs.unlinkSync(fetchedStudent.profile_picture)
    res.status(200).json(`Etudiant ${fetchedStudent.name} supprimé`);

    })


module.exports = {
    getAllStudents,
    getOneStudent,
    postStudent,
    updateStudent,
    deleteStudent,
}