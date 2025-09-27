import multer from "multer";

// 1. Set storage in memory (we’ll send to Cloudinary)
const storage = multer.memoryStorage();

// 2. File filter (only images)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image file"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
