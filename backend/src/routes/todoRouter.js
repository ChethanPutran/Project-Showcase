const express = require('express');
const Todo = require('../db/modals/todo');
const User = require('../db/modals/user');
const { ObjectId } = require('mongodb');

const { isValid } = require('../utils/objHandler');
const authenticate = require('../services/auth/authenticate');

router = new express.Router();

router.post('/todo', authenticate, async (req, res) => {
	console.log('Create req');
	setTimeout(async () => {
		try {
			const todo = await Todo.create({
				...req.body,
				owner: req.user._id,
			});
			res.status(200).send({
				status: 'success',
				data: { todo, message: 'Todo created sucessfully!' },
			});
		} catch (err) {
			const keys = ['description', 'title', 'completed'];
			const errorKey = Object.keys(err.errors).filter((item) =>
				keys.includes(item)
			);
			const message = err.message.includes('E11000')
				? 'Title has been used!'
				: err.errors[errorKey].message;

			res.status(400).send({
				status: 'failure',
				error: { type: err.errors[errorKey].name, message },
			});
		}
	}, 2000);
});

//Pagination
//GET /todos?limi=10&skip=10
//GET /todos?completed=true
//GET /todos?sortBy=createdAt_asc
//GET /todos?sortBy=createdAt_desc

//Appending items to array

router.get('/todos', authenticate, async (req, res) => {
	console.log('new get todos');
	try {
		const match = {};
		const sort = {};

		//Sorting
		if (req.query.sortBy) {
			const parts = req.query.sortBy.split('_');
			sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
		}

		const user = await User.findById(req.user._id)
			.populate({
				path: 'todos',
				match,
				options: {
					limit: parseInt(req.query.limit),
					skip: parseInt(req.query.skip),
					sort,
				},
			})
			.exec();

		if (user.todos.length > 0) {
			return res.status(200).send({ status: 'sucess', data: user.todos });
		}
		res.status(400).send({
			error: { message: 'No todo found!' },
			status: 'failure',
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			status: 'failure',
			error: { message: err.message },
		});
	}
});
router.get('/todo/:id', authenticate, async (req, res) => {
	try {
		const id = new ObjectId(req.params.id);

		const todo = await Todo.findOne({ _id: id, owner: req.user._id });

		//Getting owner details from the todo
		await todo.populate('owner').execPopulate();
		const owner = todo.owner;

		if (todo) {
			res.status(200).send({ status: 'sucess', data: todo });
		} else {
			res.status(400).json({
				error: { message: 'No user found' },
				status: 'failure',
			});
		}
	} catch (err) {
		res.status(400).send({
			error: { message: 'Invalid Id!' },
			status: 'failure',
		});
	}
});
router.patch('/todo/status', authenticate, async (req, res) => {
	try {
		const id = req.query.id;

		const todo = await Todo.findOne({ _id: id, owner: req.user._id });
		if (!todo) {
			throw new Error('No todo found!');
		}
		const updatedTodo = await Todo.updateOne(
			{ _id: id, owner: req.user._id },
			{ completed: !todo.completed },
			{ runValidators: true }
		);

		res.status(200).send({
			status: 'sucess',
			data: { updatedTodo, message: 'Status updated sucessfully!' },
		});
	} catch (err) {
		res.status(400).json({
			error: { message: err.message },
			status: 'failure',
		});
	}
});
router.patch('/todo/:id', authenticate, async (req, res) => {
	try {
		const id = req.params.id;
		const data = req.body;

		if (!isValid(Todo.schema.obj, data)) {
			throw new Error('Please provide a valid data');
		}
		const todo = await Todo.findOne({ _id: id, owner: req.user._id });

		Object.keys(data).forEach((key_) => {
			todo[key_] = req.body[key_];
		});
		await todo.save();

		if (!todo) {
			return res.status(404).send({
				status: 'failure',
				error: { message: 'No todo found!' },
			});
		}
		res.status(200).send({
			status: 'sucess',
			data: { todo, message: 'Todo updated sucessfully!' },
		});
	} catch (err) {
		res.status(400).json({
			error: { message: err.message },
			status: 'failure',
		});
	}
});

router.delete('/todo/:id', authenticate, async (req, res) => {
	setTimeout(async () => {
		try {
			console.log('Delete req');
			const id = req.params.id;

			const todo = await Todo.findOneAndDelete({
				_id: id,
				owner: req.user._id,
			});
			if (todo) {
				res.status(200).send({
					status: 'sucess',
					data: { message: 'Todo has been removed!' },
				});
			} else {
				throw new Error('No todo found!');
			}
		} catch (err) {
			res.status(400).json({
				error: { message: err.message },
				status: 'failure',
			});
		}
	}, 2000);
});

module.exports = router;
