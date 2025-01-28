import { Request, Response, NextFunction } from 'express';

/**
 * 
 * @param admin Envia un true si el usuario es admin y un false si no lo es
 * @returns  Si el usuario no es admin, se le niega el acceso
 */

export const authorization = (admin: boolean) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.user?.isAdmin !== admin) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    }
}

