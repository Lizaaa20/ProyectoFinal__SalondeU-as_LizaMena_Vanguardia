const multer = require('multer');
const path   = require('path');

// Configurar dónde y cómo guardar las imágenes
const storage = multer.diskStorage({
    // Carpeta donde se guardarán las imágenes
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    // Nombre único para cada archivo
    filename: function (req, file, cb) {
        const nombreUnico = Date.now() + path.extname(file.originalname);
        cb(null, nombreUnico);
    }
});

// Solo aceptar imágenes
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten imágenes'), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;