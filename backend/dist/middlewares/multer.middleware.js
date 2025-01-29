"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const configStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        let destination = '';
        /**
         * if the file your endpoint is movies/upload
         * save the file in uploads/movies
         * else
         * save the file in uploads/
         */
        if (req.originalUrl.includes('/api/movies')) {
            destination = "uploads/movies/";
        }
        else if (req.originalUrl.includes('/api/actors')) {
            destination = "uploads/actors/";
        }
        else {
            destination = "uploads/";
        }
        cb(null, destination);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path_1.default.extname(file.originalname)); // Nombre único
    }
});
//export const configSingle = multer({ dest: "uploads/" });
exports.upload = (0, multer_1.default)({ storage: configStorage });
