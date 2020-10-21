const createError = require('http-errors');
const mongoose = require('mongoose');

const Organization = require('../Models/Organization.model');
const Client = require('../Models/Client.model');

module.exports = {
  getAllOrganizations: async (req, res, next) => {
    try {
      const results = await Organization.find({}, { __v: 0 });
      // const results = await Organization.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await Organization.find({ price: 699 }, {});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewOrganization: async (req, res, next) => {
    try {
      const organization = new Organization(req.body);
      
      const result = await organization.save();
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

  findOrganizationById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const organization = await Organization.findById(id);
      if (!organization) {
        throw createError(404, 'Organization does not exist.');
      }
      res.send(organization);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Organization id'));
        return;
      }
      next(error);
    }
  },

  findClientsByOrganization: async (req, res, next) => {
    const {id} = req.params;
    try {
      const organization = await Organization.findById(id).populate( 'clients' );
      if (!organization) {
        throw createError(404, 'Organization has no clients.');
      }
      res.send(organization);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Organization id'));
        return;
      }
      next(error);
    }
  },

  findEmployeesByOrganization: async (req, res, next) => {
    const {id} = req.params;
    try {
      const organization = await Organization.findById(id).populate( 'employees' );
      if (!organization) {
        throw createError(404, 'Organization has no Employees.');
      }
      res.send(organization);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Organization id'));
        return;
      }
      next(error);
    }
  },

  updateAOrganization: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Organization.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Organization does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Organization Id'));
      }

      next(error);
    }
  },

  deleteAOrganization: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Organization.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, 'Organization does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Organization id'));
        return;
      }
      next(error);
    }
  }
};
