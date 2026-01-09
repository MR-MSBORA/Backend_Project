// Import multer package to handle file uploads in Node.js
import multer from "multer";

// Create a storage configuration to save files on the server disk
const storage = multer.diskStorage({

  // destination function decides where the uploaded file will be stored
  destination: function (req, file, cb) {
    // cb(null, path) means no error and set upload folder to "./public/temp"
    cb(null, "./public/temp");
  },

  // filename function decides the name of the uploaded file
  filename: function (req, file, cb) {
    // cb(null, filename) keeps the original name of the uploaded file
    cb(null, file.originalname);
  }

});

// Create multer middleware using the above storage configuration
export const upload = multer({

  // Attach the storage settings to multer
  storage,

});
