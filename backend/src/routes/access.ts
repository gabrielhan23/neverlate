import { Router } from 'express'
import { LOGIN_ROUTE } from './login'
import UserModel from '../schemas/user';

const router = Router();

export const USER_ROUTE = '/api/user';

router.route(USER_ROUTE).get((req, res, next) => {
	if (req.isAuthenticated()) {
		UserModel.find({ google_id: req.user }).then((user) => {
			res.json(user);
			console.log(user);
			next();
		})
	} else {
		res.redirect(LOGIN_ROUTE)
		next();
	}
	
})

router.route('/').get((req, res, next) => {
	res.send('hi there');
	next();
})

export default router;