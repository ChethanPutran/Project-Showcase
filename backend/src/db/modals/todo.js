const mongoose = require('mongoose');
const validator = require('validator');

const todoSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, trim: true },
		description: { type: String, required: true, trim: true },
		completed: { type: Boolean, default: false },
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
