const Student = require('../models/Student')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')


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
const getOneStudent = asyncHandler(async (req,res) => {
    const student = await Student.findByPk(req.params.id)
    if(!student){
        res.status(400)
        throw new Error('this student does not exist')
    }
    
    res.status(200).json(student)
    
})


const postStudent = asyncHandler(async (req, res)=>{
    const {student_code, name, first_name, cin, email, phone_number, course, level} = req.body
    if (!(student_code && name && first_name && cin && email && phone_number && course && level )) {
        res.status(400)
        throw new Error("Completez tous les champs disponibles")
        
    }
    
    const fetchedStudent = await Student.findOne({student_code: student_code})

    if (fetchedStudent) {
        res.status(400).json("Etudiant déja existant")
        throw new Error("Etudiant déja existant")
    }

    const student = await student.create({
        student_code, name, first_name, cin, email, phone_number, course, level,
            
    })
    
    res.status(200).json(student)
    

})

module.exports = {
    getAllStudents,
    getOneStudent,
    postStudent,
}