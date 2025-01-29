"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = void 0;
/**
 *
 * @param admin Envia un true si el usuario es admin y un false si no lo es
 * @returns  Si el usuario no es admin, se le niega el acceso
 */
const authorization = (admin) => {
    return (req, res, next) => {
        var _a;
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.isAdmin) !== admin) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
};
exports.authorization = authorization;
