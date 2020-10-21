const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  cnpj: {
    type: String,
    required: true
  },
  billable: {
    type: Boolean,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  contract_type: {
    type: String,
    required: true,
  },
  contract_hours: {
    type: Number,
    required: true,
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:'project'
    }
  ]
});

const Client = mongoose.model('client', ClientSchema);
module.exports = Client;
