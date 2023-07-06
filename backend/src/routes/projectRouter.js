const express = require('express');
const Project = require('../db/modals/project');
const User = require('../db/modals/user');
const { ObjectId } = require('mongodb');

const { isValid } = require('../utils/objHandler');
const authenticate = require('../services/auth/authenticate');

router = new express.Router();

router.post('/project', authenticate, async (req, res) => {
	console.log('Create req');
	setTimeout(async () => {
		try {
			const project = await Project.create({
				...req.body,
				owner: req.user._id,
			});
			res.status(200).send({
				status: 'success',
				data: { project, message: 'Project created sucessfully!' },
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
//GET /projects?limi=10&skip=10
//GET /projects?completed=true
//GET /projects?sortBy=createdAt_asc
//GET /projects?sortBy=createdAt_desc

//Appending items to array

router.get('/projects', authenticate, async (req, res) => {
	console.log('new get projects');
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
				path: 'projects',
				match,
				options: {
					limit: parseInt(req.query.limit),
					skip: parseInt(req.query.skip),
					sort,
				},
			})
			.exec();

		if (user.projects.length > 0) {
			return res.status(200).send({ status: 'sucess', data: user.projects });
		}
		res.status(400).send({
			error: { message: 'No project found!' },
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
router.get('/project/:id', authenticate, async (req, res) => {
	try {
		const id = new ObjectId(req.params.id);

		const project = await Project.findOne({ _id: id, owner: req.user._id });

		//Getting owner details from the project
		await project.populate('owner').execPopulate();
		const owner = project.owner;

		if (project) {
			res.status(200).send({ status: 'sucess', data: project });
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
router.patch('/project/status', authenticate, async (req, res) => {
	try {
		const id = req.query.id;

		const project = await Project.findOne({ _id: id, owner: req.user._id });
		if (!project) {
			throw new Error('No project found!');
		}
		const updatedProject = await Project.updateOne(
			{ _id: id, owner: req.user._id },
			{ completed: !project.completed },
			{ runValidators: true }
		);

		res.status(200).send({
			status: 'sucess',
			data: { updatedProject, message: 'Status updated sucessfully!' },
		});
	} catch (err) {
		res.status(400).json({
			error: { message: err.message },
			status: 'failure',
		});
	}
});
router.patch('/project/:id', authenticate, async (req, res) => {
	setTimeout(async () => {
		try {
			const id = req.params.id;
			const data = req.body;

			if (!isValid(Project.schema.obj, data)) {
				throw new Error('Please provide a valid data');
			}
			const project = await Project.findOne({ _id: id, owner: req.user._id });

			Object.keys(data).forEach((key_) => {
				project[key_] = req.body[key_];
			});
			await project.save();

			if (!project) {
				return res.status(404).send({
					status: 'failure',
					error: { message: 'No project found!' },
				});
			}
			res.status(200).send({
				status: 'sucess',
				data: { project, message: 'Project updated sucessfully!' },
			});
		} catch (err) {
			res.status(400).json({
				error: { message: err.message },
				status: 'failure',
			});
		}
	}, 4000);
});

router.delete('/project/:id', authenticate, async (req, res) => {
	setTimeout(async () => {
		try {
			console.log('Delete req');
			const id = req.params.id;

			const project = await Project.findOneAndDelete({
				_id: id,
				owner: req.user._id,
			});
			if (project) {
				res.status(200).send({
					status: 'sucess',
					data: { message: 'Project has been removed!' },
				});
			} else {
				throw new Error('No project found!');
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
