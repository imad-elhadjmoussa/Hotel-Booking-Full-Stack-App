import multer from 'multer';

// Use memory storage instead of disk
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits:{
        fileSize: 5 * 1024 * 1024 // Limit file size to 5MB
    }
});

export default upload;