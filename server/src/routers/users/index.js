const express = require('express');
const Router = express.Router();

const UserController = require('../../app/controllers/user/UserController');
const userSupplierController = require('../../app/controllers/user/UserSupplierController');

const validateLogin = require('../../app/middleware/validateUsers/validateLogin');
const validateChangePassword = require('../../app/middleware/validateUsers/validateChangePassword');
const validatePassword = require('../../app/middleware/validateUsers/validatePassword');
const validateChangeAvatar = require('../../app/middleware/validateUsers/validateChangeAvatar');

Router.post('/login', validateLogin, UserController.postLogin);

Router.post('/:userEmail/logout', UserController.logout);

Router.get('/:email/profile', UserController.profileUser);

Router.get('/:email/update', UserController.update);

Router.put(
  '/:email/update',
  validateChangePassword,
  validatePassword,
  UserController.postUpdate,
);

Router.put(
  '/:email/update/avatar',
  validateChangeAvatar,
  UserController.postUpdateAvatar,
);

Router.get('/:email/list/users', userSupplierController.index);

module.exports = Router;
