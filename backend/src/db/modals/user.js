const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
	{
		name: { type: String, minlength: 5, maxlength: 25, required: true },
		g_id: { type: String, required: true },
		email: {
			type: String,
			unique: [true, 'Email has been taken'],
			required: true,
			validate(email) {
				if (!validator.isEmail(email)) {
					throw { message: 'Invalid email' };
				}
			},
		},
		avatar: {
			uploadedAt: {
				type: Date,
			},
			name: { type: String },
			link: { type: String },
			img: {
				data: Buffer,
				contentType: String,
			},
		},
	},
	{ timestamps: true }
);

//Connecting User with project
userSchema.virtual('projects', {
	ref: 'Project',
	localField: '_id',
	foreignField: 'owner',
});

userSchema.pre('save', function (next) {
	this.validate()
		.then(() => {
			next();
		})
		.catch((err) => {
			throw err;
		});
});
const User = mongoose.model('User', userSchema);
module.exports = User;
