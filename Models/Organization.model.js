const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrganizationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  cnpj: {
    type: String,
    required: true
  },
  administrators: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    }
  ],
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    }
  ],
  clients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:'client'
    }
  ]
});

const Organization = mongoose.model('organization', OrganizationSchema);
module.exports = Organization;
