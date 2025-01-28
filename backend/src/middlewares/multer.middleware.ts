import multer from "multer";
import path from "path";

const configStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let destination: string = '';
        /**
         * if the file your endpoint is movies/upload
         * save the file in uploads/movies
         * else
         * save the file in uploads/
         */
        if (req.originalUrl.includes('/api/movies')) {
            destination = "uploads/movies/";
        } else if (req.originalUrl.includes('/api/actors')) {
            destination = "uploads/actors/";
        } else {
            destination = "uploads/";
        }
        cb(null, destination);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Nombre único
    }
});

//export const configSingle = multer({ dest: "uploads/" });
export const upload = multer({ storage: configStorage });