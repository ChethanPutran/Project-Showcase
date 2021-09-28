//importing node modules
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

//Importing local modules
const User = require('../../db/modals/user');

passport.serializeUser(function (user, done) {
	try {
		done(null, user._id);
	} catch (err) {
		done(err.message, null);
	}
});

passport.deserializeUser(async (id, done) => {
	const user = await User.findOne({
		_id: id,
	});
	done(null, user);
});

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_OAUTH2_CLIENT_ID,
			clientSecret: process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
			callbackURL: '/users/auth/google/verify',
			passReqToCallBack: true,
		},
		async (request, accessToken, refreshToken, profile, done) => {
			try {
				const user = await User.findOne({ email: profile.email });
				if (user) {
					return done(null, user);
				} else {
					try {
						const newUser = {
							g_id: `${profile.id}`,
							name: `${profile.given_name} ${
								profile.family_name ? profile.family_name : ''
							}`,
							email: profile.email,
							avatar: {
								name: `${profile.given_name}.png`,
								uploadedAt: new Date(),
								link: profile.picture,
							},
						};

						const user_ = new User(newUser);
						await user_.save();
						return done(null, user_);
					} catch (err) {
						return done(err.message, null);
					}
				}
			} catch (err) {
				return done(err.message, null);
			}
		}
	)
);
