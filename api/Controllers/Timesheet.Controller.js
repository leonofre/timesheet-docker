const createError = require('http-errors');
const mongoose = require('mongoose');

const TimeSheet = require('../Models/TimeSheet.model');
const workingBetweenDays = require('../Helper/Time.Helper');

module.exports = {
  getAllTimeSheets: async (req, res, next) => {
    try {
      const results = await TimeSheet.find({}, { __v: 0 });
      // const results = await TimeSheet.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await TimeSheet.find({ price: 699 }, {});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewTimeSheet: async (req, res, next) => {
    try {
      const timeSheet = new TimeSheet(req.body);
      var start_time = new Date();
      start_time.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })

      timeSheet.start = start_time.getTime();

      const result = await timeSheet.save();
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

  findTimeSheetById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const timeSheet = await TimeSheet.findById(id);
      if (!timeSheet) {
        throw createError(404, 'TimeSheet does not exist.');
      }
      res.send(timeSheet);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid TimeSheet id'));
        return;
      }
      next(error);
    }
  },

  findTimeSheetByProject: async (req, res, next) => {
    const {id} = req.params;
    try {
      const timesheet = await TimeSheet.find({ project: id});
      if (!timesheet) {
        throw createError(404, 'Timesheet does not exist.');
      }

      res.send(timesheet);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Timesheet id'));
        return;
      }
      next(error);
    }
  },

  findTimeSheetByUser: async (req, res, next) => {
    const {id} = req.params;
    try {
      const timesheet = await TimeSheet.find({ user: id});
      if (!timesheet) {
        throw createError(404, 'Timesheet does not exist.');
      }

      res.send(timesheet);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Timesheet id'));
        return;
      }
      next(error);
    }
  },

  updateATimeSheet: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await TimeSheet.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'TimeSheet does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid TimeSheet Id'));
      }

      next(error);
    }
  },

  StopATimeSheet: async (req, res, next) => {
    try {
      var id         = req.params.id;
      const options    = { new: true };
      const timesheet  = await TimeSheet.findById(id);
      const end_date   = new Date();

      end_date.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })

      var start_date = new Date( timesheet.start );
      start_date.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })

      var updates = req.body;
      
      if ( timesheet.end ) {
        throw createError(412, 'Precondition Failed');
      }
      
      if ( end_date.getUTCDate() !== start_date.getUTCDate() ) {
        const diffTime = Math.abs( end_date - start_date );

        const firstDayTime = 86399 - ( ( start_date.getUTCHours() * 3600 ) + ( start_date.getUTCMinutes() * 60 ) + start_date.getUTCSeconds() );

        var diffSeconds = Math.floor( diffTime / 1000 - firstDayTime );
        var diffMinutes = Math.floor( diffSeconds / 60 );
        var diffHours = Math.floor( diffMinutes / 60 );
        var diffDays = Math.floor( diffHours / 24 );

        var prev_end = new Date( timesheet.start );

        prev_end.setUTCMinutes( 59 );
        prev_end.setUTCSeconds( 59 );
        prev_end.setUTCHours( 23 );

        updates.end = prev_end.getTime();
        updates.start = start_date.getTime();
        var result = await TimeSheet.findByIdAndUpdate(id, updates, options);

        while ( diffSeconds !== 0 ) {
          prev_end.setSeconds(  prev_end.getSeconds() + 1 );

          var next_start = prev_end;

          var response = await workingBetweenDays( diffDays, diffHours, diffMinutes, diffSeconds, next_start, timesheet, { 'result': [ result ] } );
          var {result, seconds} = response;

          diffSeconds = seconds;
        }
      } else {

        updates.end = end_date;
  
        const result = await TimeSheet.findByIdAndUpdate(id, updates, options);
        if (!result) {
          throw createError(404, 'TimeSheet does not exist');
        }
      }

      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid TimeSheet Id'));
      }

      next(error);
    }
  },

  deleteATimeSheet: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await TimeSheet.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, 'TimeSheet does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid TimeSheet id'));
        return;
      }
      next(error);
    }
  }
};
