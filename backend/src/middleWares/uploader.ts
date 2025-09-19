import multer from 'multer';

const storage = multer.diskStorage({
  destination: "./public/uploads/images"
});

const uploader = multer({
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  storage,
});

export default uploader;
