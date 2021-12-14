const routerHome = require('./home');
const routerUser = require('./users');
const routerSupplier = require('./supplier');
const routerCompany = require('./company');

function Route(app) {
  app.use('/user', routerUser);

  app.use('/supplier', routerSupplier);

  app.use('/company', routerCompany);

  app.use('/', routerHome);
}

module.exports = Route;
