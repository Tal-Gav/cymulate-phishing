"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyAccessToken = exports.generateAccessToken = exports.generateRefreshToken = void 0;
const config_1 = require("../config/config");
const jwt = require("jsonwebtoken");
const generateRefreshToken = (id) => {
    return jwt.sign({ id }, config_1.jwtConfig.refreshTokenSecret, {
        expiresIn: '7d',
    });
};
exports.generateRefreshToken = generateRefreshToken;
const generateAccessToken = (payload) => {
    return jwt.sign(payload, config_1.jwtConfig.accessTokenSecret, {
        expiresIn: '10m',
    });
};
exports.generateAccessToken = generateAccessToken;
const verifyAccessToken = (token) => {
    try {
        const decoded = jwt.verify(token, config_1.jwtConfig.accessTokenSecret);
        return { valid: true, expired: false, decoded };
    }
    catch (error) {
        return {
            valid: false,
            expired: error.name === 'TokenExpiredError',
            msg: error.message,
            decoded: null,
        };
    }
};
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (token) => {
    try {
        const decoded = jwt.verify(token, config_1.jwtConfig.refreshTokenSecret);
        return { valid: true, expired: false, decoded };
    }
    catch (error) {
        return {
            valid: false,
            expired: error.name === 'TokenExpiredError',
            msg: error.message,
            decoded: null,
        };
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
//# sourceMappingURL=jwt.js.map