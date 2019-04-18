module.exports = function(app) {
  var controller = require('../controllers/controller');

  app.route('/accounts/')
    .get(controller.read_accounts);

app.route('/accounts')
.post(controller.add_account);

};

  app.route('/details/')
    .get(controller.list_details)
    .post(controller.add_details);
};

  app.route('/users/')
    .get(controller.read_a_user);

app.route('/users')
.post(controller.add_a_user);

};