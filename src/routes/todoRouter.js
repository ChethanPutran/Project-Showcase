const express = require('express');
const Todo = require('../db/modals/todo');
const { ObjectId } = require('mongodb');

const { isValid } = require('../utils/objHandler');
const authenticate = require('../services/auth/authenticate');

router = new express.Router();

router.post('/user/todos', authenticate, async (req, res) => {
	try {
		const todo = await Todo.create({ ...req.body, owner: req.user._id });
		res.status(200).send({ status: 'success', data: { todo } });
	} catch (err) {
		res.status(400).send({ status: 'failure', error: err });
		console.log('Error', err);
	}
});

//Pagination
//GET /todos?limi=10&skip=10
//GET /todos?completed=true
//GET /todos?sortBy=createdAt_asc
//GET /todos?sortBy=createdAt_desc

router.get('/user/todos', authenticate, async (req, res) => {
	try {
		const match = {};
		const sort = {};

		//Sorting
		if (req.query.sortBy) {
			const parts = req.query.sortBy.split('_');
			sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
		}
		console.log(sort);
		// const todos = await Todo.find({ owner: req.user._id });
		await req.user
			.populate({
				path: 'todos',
				match,
				options: {
					limit: parseInt(req.query.limit),
					skip: parseInt(req.query.skip),
					sort,
				},
			})
			.execPopulate();
		if (req.user.todos.length > 0) {
			return res.status(200).send(req.user.todos);
		}
		res.status(400).send({ error: 'No todo found!' });
	} catch (err) {
		res.status(500).send({
			error: 'Unexpexted Error!',
			reason: err.message,
		});
	}
});
router.get('/user/todos/:id', authenticate, async (req, res) => {
	try {
		const id = new ObjectId(req.params.id);

		const todo = await Todo.findOne({ _id: id, owner: req.user._id });

		//Getting owner details from the todo
		await todo.populate('owner').execPopulate();
		const owner = todo.owner;

		if (todo) {
			res.status(200).send({ todo });
		} else {
			res.status(400).json({ error: 'No user found' });
		}
	} catch (err) {
		res.status(400).send({ error: 'Invalid Id!' });
	}
});

router.patch('/user/todo/:id', authenticate, async (req, res) => {
	try {
		const id = req.params.id;

		if (!isValid(Todo.schema.obj, data)) {
			throw new Error('Please provide a valid data');
		}
		const todo = await Todo.findOne({ _id: id, owner: req.user._id });
		Object.keys(data).forEach((key_) => (todo[key_] = req.body[key_]));
		await todo.save();

		if (!todo) {
			return res.status(404).send('No todo found!');
		}
		res.status(200).send(todo);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

router.delete('/user/todos/:id', authenticate, async (req, res) => {
	try {
		const id = req.params.id;

		const todo = await Todo.findOneAndDelete({
			_id: id,
			owner: req.user._id,
		});
		if (todo) {
			res.status(200).send('Todo has been removed!');
		} else {
			throw new Error('No todo found!');
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

module.exports = router;
