import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';

import UserModel from '../schemas/user';

export const LOGIN_REDIRECT = '/api/login/redirect';
export const SCOPE = ['profile', 'email'];

function passportInit() {
  passport.use(new GoogleStrategy.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: LOGIN_REDIRECT,
    scope: SCOPE,
    state: true,
  }, async (accessToken, refreshToken, profile, done) => {
    const email = profile.emails?.[0].value;

    // null check for type safety
    if (!email) {
      return done(null, false, { message: 'No email found' });
    }

    let user = await UserModel.findOne({ email });

    if (!user) {
      user = await new UserModel({
        email,
        google_id: profile.id,
		access_token: accessToken,
        username: profile.displayName,
      });
    }

    user.save();

    done(null, user);
  }));

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user: any, done) => {
    done(null, user);
  });
}

export default passportInit;
