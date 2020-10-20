const createError = require('http-errors');
const mongoose = require('mongoose');

const Client = require('../Models/Client.model');

module.exports = {
  getAllClients: async (req, res, next) => {
    try {
      const results = await Client.find({}, { __v: 0 });
      // const results = await Client.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await Client.find({ price: 699 }, {});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewClient: async (req, res, next) => {
    try {
      const client = new Client(req.body);
      client.color = client.color ? client.color : "blue";
      const result = await client.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === 'ValidationError') {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },

  findClientById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const client = await Client.findById(id);
      if (!client) {
        throw createError(404, 'Client does not exist.');
      }
      res.send(client);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Client id'));
        return;
      }
      next(error);
    }
  },

  findProjectByClient: async (req, res, next) => {
    const {id} = req.params;
    try {
      const client = await Client.findById(id).populate( 'projects' );
      if (!client) {
        throw createError(404, 'Client has no projects.');
      }
      res.send(client);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Client id'));
        return;
      }
      next(error);
    }
  },

  updateAClient: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Client.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Client does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Client Id'));
      }

      next(error);
    }
  },

  deleteAClient: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Client.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, 'Client does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Client id'));
        return;
      }
      next(error);
    }
  }
};
