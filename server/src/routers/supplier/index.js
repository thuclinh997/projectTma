const express = require('express');
const Router = express.Router();

const SupplierController = require('../../app/controllers/user/SupplierController');
const UserSupplierController = require('../../app/controllers/user/UserSupplierController');

const validateRegister = require('../../app/middleware/validateUsers/validateRegister');
const validateChangePassword = require('../../app/middleware/validateUsers/validateChangePassword');
const validateRegisterService = require('../../app/middleware/service/validate/validateRegister.service');
const validatePassword = require('../../app/middleware/validateUsers/validatePassword');

Router.post(
  '/inviter',
  validateRegister,
  validateRegisterService,
  SupplierController.postRegisterSupplier,
);

Router.get('/:id/confirm', SupplierController.confirmActive);

Router.put(
  '/:id/confirm',
  validateChangePassword,
  validatePassword,
  SupplierController.postActiveSupplier,
);

Router.get('/:id/change-password', SupplierController.changePassword);

Router.put('/:id/change/status', UserSupplierController.changeStatus);

Router.put('/:id/reset/password', UserSupplierController.resetPassword);

module.exports = Router;
