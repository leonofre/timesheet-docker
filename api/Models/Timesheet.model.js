const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const TimeSheetSchema = new Schema({
  start: {
    type: Number,
    required: true
  },
  end: {
    type: Number,
    required: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'project',
    required: true
  },
  billable: {
    type: Boolean,
    required: true
  },
  total_time: {
    type: String,
    require: false,
    default: function() {
      var total_time = '0';
      var start_sec = new Date( this.start );
      var end_sec = new Date( this.end );

      
      if ( this.end ) {
        total_time = Math.floor( end_sec.getTime() - start_sec.getTime() ) / 1000;

        var hours = Math.floor(total_time / 60 / 60).toString().padStart(2, '0');
        var minutes = ( Math.floor(total_time / 60) - (hours * 60) ).toString().padStart(2, '0');
        var seconds = ( total_time % 60 ).toString().padStart(2, '0');

        total_time = `${hours}:${minutes}:${seconds}`;

        return total_time;
      }

    }
  }
});

const TimeSheet = mongoose.model('timesheet', TimeSheetSchema);
module.exports = TimeSheet;
