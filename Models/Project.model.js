const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  client :{
      type:mongoose.Schema.Types.ObjectId,
      ref:'client',
      required: true,
  },
  billable: {
    type: Boolean,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  used_time: {
    type: Number,
    required: true,
  }
});

const Project = mongoose.model('project', ProjectSchema);
module.exports = Project;
