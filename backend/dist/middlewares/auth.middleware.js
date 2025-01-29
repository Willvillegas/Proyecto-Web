"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const JWT_1 = require("../utils/JWT");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer'))) {
            return res.status(401).json({ message: 'Access denied' });
        }
        const token = authHeader.split(' ')[1];
        const userPaylod = (0, JWT_1.jwtVerify)(token);
        if (!userPaylod) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = userPaylod;
        next();
    }
    catch (error) {
        // Manejar diferentes tipos de errores
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return res.status(403).json({ message: 'Token expirado' });
        }
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return res.status(403).json({ message: 'Token inválido' });
        }
        next(error);
    }
};
exports.authMiddleware = authMiddleware;
