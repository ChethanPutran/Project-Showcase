const mongoose = require('mongoose');

mongoose.connect(
	process.env.DATABASE_URI,
	{
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		autoIndex: true,
	},
	(error) => {
		if (error) {
			return console.log('Unable to connect to database!');
		}
		console.log('Database connection successful!');
	}
);
