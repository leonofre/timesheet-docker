const createError = require('http-errors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const User = require('../Models/User.model');

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const results = await User.find({}, { __v: 0 });
      // const results = await User.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await User.find({ price: 699 }, {});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewUser: async (req, res, next) => {
    try {
      const user = new User(req.body);
      
      const result = await user.save();
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

  findUserById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const user = await User.findById(id);
      if (!user) {
        throw createError(404, 'User does not exist.');
      }
      res.send(user);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid User id'));
        return;
      }
      next(error);
    }
  },

  userLoginCheck: async (req, res, next) => {
    try {
      const user = await User.find({ email: req.body.email});
      if ( user.length === 0 ) {
        throw new Error('E-mail not found');
      }

      var pass_check = false;
      bcrypt.compare( req.body.password, user[0].password, function(err, result) {
        pass_check = result;
        res.send( pass_check );
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid User id'));
        return;
      }
      next(error);
    }
  },

  updateAUser: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await User.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'User does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid User Id'));
      }

      next(error);
    }
  },

  deleteAUser: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await User.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, 'User does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid User id'));
        return;
      }
      next(error);
    }
  }
};
