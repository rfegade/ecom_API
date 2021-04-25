import * as multer from 'multer' // to upload the files at physical location

// File Upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + '/product')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
   
  export const upload = multer({ storage: storage })