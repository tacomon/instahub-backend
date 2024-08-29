// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // Verifica si el directorio de uploads existe y créalo si no
// const uploadDir = 'uploads/';
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir); 
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)); 
//   }
// });

// // Filtro de archivo
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Solo se permiten imágenes'), false);
//   }
// };

// // Configuración de Multer
// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: { fileSize: 1024 * 1024 * 5 } // Limite de 5MB
// });

// module.exports = upload;


// config/multerConfig.js

// const multer = require('multer');
// const path = require('path');

// // Configuración de almacenamiento
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// // Filtro para aceptar solo imágenes
// const fileFilter = (req, file, cb) => {
//   const allowedFileTypes = /jpeg|jpg|png/;
//   const mimeType = allowedFileTypes.test(file.mimetype);
//   const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());

//   if (mimeType && extname) {
//     return cb(null, true);
//   }
//   cb(new Error('Solo se permiten imágenes'));
// };

// // Inicialización de multer
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1024 * 1024 * 5 }, // Limitar el tamaño de la imagen a 5MB
//   fileFilter: fileFilter,
// });

// module.exports = upload;





const multer = require('multer');
const path = require('path');

// Configuración del almacenamiento de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para cada archivo
  }
});

// Inicializar Multer
const upload = multer({ storage: storage });

module.exports = upload;
