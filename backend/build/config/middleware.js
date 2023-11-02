"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = require("express");
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
function loadMiddleware(app) {
    app.use((0, express_1.json)());
    app.use((0, cors_1.default)({
        credentials: true,
        origin: ['http://localhost:3000', 'http://localhost:8080'],
    }));
    // app.use(helmet());
    app.use((0, express_session_1.default)({
        secret: env.SESSION_SECRET,
        name: 'sessionId',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: true,
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
            sameSite: 'lax',
        },
        rolling: true,
    }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
}
exports.default = loadMiddleware;
