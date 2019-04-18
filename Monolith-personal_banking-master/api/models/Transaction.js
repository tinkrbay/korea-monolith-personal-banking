var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TransactionSchema = new Schema({
  emailAddress: {
    type: String,
    Required: 'Kindly enter the name of the Account'
  },
balance: {
    type: Number,
    default: 0.0
  },
  date: {
    type: String,
  },
type:{
    type: String,
    Required: 'Kindly enter the type of Transaction'
  },
  accountid: {
    type: String,
    Required: 'Kindly enter the Account ID'
  }
});

module.exports = mongoose.model('Transaction', TransactionSchema);