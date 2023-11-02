"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOGOUT_ROUTE = exports.LOGIN_ROUTE = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const access_1 = require("./access");
const passport_2 = require("../config/passport");
exports.LOGIN_ROUTE = '/api/login';
exports.LOGOUT_ROUTE = '/api/logout';
const SUCCESS_REDIRECT = access_1.USER_ROUTE;
const FAILURE_REDIRECT = '/api/login/failure';
const router = (0, express_1.Router)();
router.route(exports.LOGIN_ROUTE).get((req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect(SUCCESS_REDIRECT);
    }
    else {
        console.log('trying to auth');
    }
    next();
}, passport_1.default.authenticate('google', {
    scope: passport_2.SCOPE,
    accessType: 'offline',
    prompt: 'consent',
}));
router.route(passport_2.LOGIN_REDIRECT).get(passport_1.default.authenticate('google', {
    failureRedirect: FAILURE_REDIRECT,
    successRedirect: SUCCESS_REDIRECT,
}));
router.route(exports.LOGOUT_ROUTE).get((req, res) => {
    req.logout((err) => {
        if (err) {
            res.redirect(FAILURE_REDIRECT);
        }
        else {
            res.redirect(SUCCESS_REDIRECT);
        }
    });
});
exports.default = router;
