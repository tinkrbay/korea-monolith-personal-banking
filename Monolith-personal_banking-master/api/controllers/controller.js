var mongoose = require('mongoose'),
  UserDetails = mongoose.model('User');
  AccountDetails = mongoose.model('Account');  
  TransactionDetails = mongoose.model('Transaction');


exports.read_a_user= function(req, res) {
  UserDetails.findOne({'emailAddress':req.query.userId}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.add_a_user= function(req, res) {
  var new_task = new UserDetails(req.body);
  new_task.save(function(err, task) {
    if(err)
      res.send(err)
    res.json(task);
  });
};

exports.read_accounts= function(req, res) {
  AccountDetails.find({'emailAddress':req.query.emailAddress}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.add_account= function(req, res) {
  var new_task = new AccountDetails(req.body);
  new_task.save(function(err, task) {
    if(err)
      res.send(err)
    res.json(task);
  });
};

exports.list_details = function(req, res) {
  TransactionDetails.find({'emailAddress':req.query.emailAddress,'accountid':req.query.accountid}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.add_details= function(req, res) {
  var new_task = new TransactionDetails(req.body);
  new_task.save(function(err, task) {
    if(err)
      res.send(err)
    res.json(task);
  });
};