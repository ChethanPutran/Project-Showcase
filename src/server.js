const express = require('express');
require('dotenv').config();
require('./db/connection');
const path = require('path');
const bodyParser = require('body-parser');

// const userRouter = require('./routes/userRoutes');
// const projectRouter = require('./routes/projectRouters');

const app = express();

const port = process.env.PORT;

const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

// for parsing application/json
app.use(express.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});
// app.use(userRouter);
// app.use(projectRouter);

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
