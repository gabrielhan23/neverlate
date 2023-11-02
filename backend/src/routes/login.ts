import { Router } from 'express';
import passport from 'passport';

import { USER_ROUTE } from './access';
import { LOGIN_REDIRECT, SCOPE } from '../config/passport';

export const LOGIN_ROUTE = '/api/login';
export const LOGOUT_ROUTE = '/api/logout';

const SUCCESS_REDIRECT = USER_ROUTE;
const FAILURE_REDIRECT = '/api/login/failure';

const router = Router();

router.route(LOGIN_ROUTE).get((req, res, next) => {
	if (req.isAuthenticated()) {
		res.redirect(SUCCESS_REDIRECT);
	} else {
		console.log('trying to auth');
	}
	next();
}, passport.authenticate('google', {
	scope: SCOPE,
	accessType: 'offline',
	prompt: 'consent',
}));

router.route(LOGIN_REDIRECT).get(passport.authenticate('google', {
	failureRedirect: FAILURE_REDIRECT,
	successRedirect: SUCCESS_REDIRECT,
}));

router.route(LOGOUT_ROUTE).get((req, res) => {
	req.logout((err) => {
	if (err) {
		res.redirect(FAILURE_REDIRECT);
	} else {
		res.redirect(SUCCESS_REDIRECT);
	}
	});
});

export default router;
