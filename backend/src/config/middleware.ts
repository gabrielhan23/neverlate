import cors from 'cors';
import type { Express } from 'express';
import { json } from 'express';
import session from 'express-session';
import passport from 'passport';

function loadMiddleware(app: Express) {
	app.use(json());
	app.use(cors({
		credentials: true,
		origin: ['http://localhost:3000', 'http://localhost:8080'],
	}));
	// app.use(helmet());
	app.use(session({
	secret: process.env.SESSION_SECRET!,
	name: 'sessionId',
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: false,
		httpOnly: true,
		maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
		sameSite: 'lax',
	},
	rolling: true,
	}));
	app.use(passport.initialize());
	app.use(passport.session());
}

export default loadMiddleware;
