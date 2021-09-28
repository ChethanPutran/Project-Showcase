const mongoose = require('mongoose');
const validator = require('validator');

const todoSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			unique: [true, 'Title has been used!'],
			minlength: [3, 'Title is too short. Got {VALUE} but (>3)'],
			maxlength: [50, 'Title is too long!'],
			required: [true, 'Title is required!'],
		},

		description: {
			type: String,
			required: [true, 'Description is required!'],
			minlength: [
				20,
				'Description is too short. (Should contain >20 letters)',
			],
			maxlength: [300, 'Description is too long! (<300 letters)'],
			required: [true, 'Description is required!'],
			trim: true,
		},
		completed: { type: Boolean, default: false },
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			required: [true, 'Owner is required!'],
			ref: 'User',
		},
	},
	{ timestamps: true }
);

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
