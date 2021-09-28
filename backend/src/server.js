const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const cors = require('cors');
require('dotenv').config();
require('./db/connection');

const MongoStore = require('connect-mongo');

const indexRouter = require('./routes/indexRouter');
const userRouter = require('./routes/userRouter');
const todoRouter = require('./routes/todoRouter');

const app = express();
const port = process.env.PORT;
const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));
// for parsing application/json
app.use(express.json());

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// for parsing application/xwww-
app.use(express.urlencoded({ extended: false }));

app.use(
	session({
		key: process.env.SESSION_KEY,
		secret: process.env.SESSION_SCRT,
		saveUninitialized: false,
		resave: false,
		store: MongoStore.create({
			mongoUrl: process.env.DB_URL,
			collections: 'sessions',
		}),
		cookie: {
			maxAge: 30 * 60 * 1000,
			domain: 'localhost',
		},
	})
);

app.use(passport.initialize());
app.use(flash());
app.use(passport.session());

app.use(indexRouter);
app.use('/users', userRouter);
app.use('/user', todoRouter);

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
