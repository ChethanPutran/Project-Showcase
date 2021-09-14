const mongoose = require('mongoose');

mongoose.connect(
	process.env.DB_URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		autoIndex: true,
	},
	(error) => {
		if (error) {
			return console.log('Unable to connect to database!', error);
		}
		console.log('Database connection successful!');
	}
);
