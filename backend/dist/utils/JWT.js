"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtVerify = exports.jwtGenerate = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const jwtGenerate = (user) => {
    return (0, jsonwebtoken_1.sign)({
        _id: user._id,
        name: user.name,
        username: user.username,
        isAdmin: user.isAdmin
    }, process.env.JWT, { expiresIn: '1d' });
};
exports.jwtGenerate = jwtGenerate;
const jwtVerify = (token) => {
    try {
        return (0, jsonwebtoken_1.verify)(token, process.env.JWT);
    }
    catch (error) {
        throw new Error('Invalid token' + error);
    }
};
exports.jwtVerify = jwtVerify;
