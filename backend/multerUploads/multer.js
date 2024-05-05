const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads/announcement"); 
    },
    filename: function(req, file, cb) {
        cb(null,file.originalname); 
    }
});

const upload = multer({ storage: storage });

const handleFileUpload = (fieldName) => {
    return upload.single(fieldName);
};

module.exports = handleFileUpload;
