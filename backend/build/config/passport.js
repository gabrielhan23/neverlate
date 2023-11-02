"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCOPE = exports.LOGIN_REDIRECT = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const user_1 = __importDefault(require("../schemas/user"));
exports.LOGIN_REDIRECT = '/api/login/redirect';
exports.SCOPE = ['profile', 'email'];
function passportInit() {
    passport_1.default.use(new passport_google_oauth20_1.default.Strategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: exports.LOGIN_REDIRECT,
        scope: exports.SCOPE,
        state: true,
    }, (accessToken, refreshToken, profile, done) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const email = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0].value;
        // null check for type safety
        if (!email) {
            return done(null, false, { message: 'No email found' });
        }
        let user = yield user_1.default.findOne({ email });
        if (!user) {
            user = yield new user_1.default({
                email,
                google_id: profile.id,
                access_token: accessToken,
                username: profile.displayName,
            });
        }
        user.save();
        done(null, profile.id);
    })));
    passport_1.default.serializeUser((user, done) => {
        done(null, user);
    });
    passport_1.default.deserializeUser((user, done) => {
        done(null, user);
    });
}
exports.default = passportInit;
