const multer = require('multer')
const path = require('path');
const moment = require('moment')

const storage = multer.diskStorage({
  destination: './public/profilepics/',
  filename: function(req, file, cb){
    cb(null, moment.now().toString() + path.extname(file.originalname));
  }
});



function checkFileType(file, cb){
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}
  
  const upload = multer({
    storage: storage,
    limits:{fileSize: 10000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  }).single('profile_pic');

  module.exports = {
    upload
  }