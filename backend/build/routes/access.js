"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_ROUTE = void 0;
const express_1 = require("express");
const login_1 = require("./login");
const user_1 = __importDefault(require("../schemas/user"));
const router = (0, express_1.Router)();
exports.USER_ROUTE = '/api/user';
router.route(exports.USER_ROUTE).get((req, res, next) => {
    console.log(req.user);
    if (req.isAuthenticated()) {
        user_1.default.find({ google_id: req.user }).then((user) => {
            // res.json(user);
            console.log(user);
        });
        res.send('welcome');
    }
    else {
        res.redirect(login_1.LOGIN_ROUTE);
    }
    next();
});
router.route('/').get((req, res, next) => {
    res.send('hi there');
    next();
});
exports.default = router;
