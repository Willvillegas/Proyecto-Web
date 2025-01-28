import { jwtVerify } from "../utils/JWT";
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { IUser } from "../interfaces/user.interface";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader?.startsWith('Bearer')) {
            return res.status(401).json({ message: 'Access denied' });
        }

        const token = authHeader.split(' ')[1];
        const userPaylod = jwtVerify(token);
        if (!userPaylod) {
            return res.status(401).json({ message: 'Invalid token' });
        }


        req.user = userPaylod as IUser;
        next();
    } catch (error) {
        // Manejar diferentes tipos de errores
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(403).json({ message: 'Token expirado' });
        }
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(403).json({ message: 'Token inválido' });
        }
        next(error);
    }
}
