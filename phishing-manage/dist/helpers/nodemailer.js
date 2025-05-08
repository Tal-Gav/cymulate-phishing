"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer_1 = require("nodemailer");
exports.transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'talgav23@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});
//# sourceMappingURL=nodemailer.js.map