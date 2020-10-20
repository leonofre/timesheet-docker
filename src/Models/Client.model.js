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
  }
});

const Client = mongoose.model('client', ClientSchema);
module.exports = Client;
