const createError = require('http-errors');
const mongoose = require('mongoose');

const Project = require('../Models/Project.model');
const Client = require('../Models/Client.model');

module.exports = {
  getAllProjects: async (req, res, next) => {
    try {
      const results = await Project.find({}, { __v: 0 });
      // const results = await Project.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await Project.find({ price: 699 }, {});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewProject: async (req, res, next) => {
    try {
      const client_id = req.body.client;
      const project = new Project(req.body);
      project.color = project.color ? project.color : "blue";

      const client = await Client.findById(client_id);

      if ( ! client ) {
        throw createError(404, 'Client does not exist.');
      }

      const result = await project.save();


      client.projects.push(project);
      const client_update = await client.save();

      res.send({ project : result, client : client_update });
    } catch (error) {
      console.log(error.message);
      if (error.name === 'ValidationError') {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },

  findProjectById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const project = await Project.findById(id);
      if (!project) {
        throw createError(404, 'Project does not exist.');
      }
      res.send(project);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Project id'));
        return;
      }
      next(error);
    }
  },

  findClientByProject: async (req, res, next) => {
    const { id } = req.params;
    try {
      const project = await Project.findById(id).populate('client');
      if (!project) {
        throw createError(404, 'Project does not exist.');
      }
      res.send(project);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Project id'));
        return;
      }
      next(error);
    }
  },

  updateAProject: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Project.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Project does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Project Id'));
      }

      next(error);
    }
  },

  deleteAProject: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Project.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, 'Project does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Project id'));
        return;
      }
      next(error);
    }
  }
};
