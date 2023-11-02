import { Router } from 'express'
import { LOGIN_ROUTE } from './login'
import UserModel from '../schemas/user';

const router = Router();

export const USER_ROUTE = '/api/user';

router.route(USER_ROUTE).get((req, res, next) => {
	console.log(req.user);
	if (req.isAuthenticated()) {
		UserModel.find({ google_id: req.user }).then((user) => {
			// res.json(user);
			console.log(user);
		})
		res.send('welcome');
	} else {
		res.redirect(LOGIN_ROUTE)
	}
	next();
})

router.route('/').get((req, res, next) => {
	res.send('hi there');
	next();
})

export default router;