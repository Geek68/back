const multer = require('multer')
const path = require('path');
const moment = require('moment')

const storage = multer.diskStorage({
  destination: './public/xlsxFile/',
  filename: function(req, file, cb){
    cb(null, moment.now().toString() + path.extname(file.originalname));
  }
});

const checkFileType = (req, file, cb) => {
    const filetypes = /xlsx/;
    if(!file.originalname.match(/\.(xls|xlsx)$/)){        
        cb('Invalid Type of file, only excel File are allowed!');
    }
    cb(null, true)
}


let _uploadingFile = multer({storage : storage, limits:{fileSize: 1000000}, fileFilter : checkFileType})
const uploadXlsxFile = (req, res, next) => {
    _uploadingFile.single('upload_file')(req, res, (error) => {
        if(error){
            console.error(error)
            res.status(400).json({message:error.stack})
        }else{
            next()
        }
    })
}


module.exports = {
    uploadXlsxFile
}