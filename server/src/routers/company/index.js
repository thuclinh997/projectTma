const express = require('express');
const Router = express.Router();

const CompanyController = require('../../app/controllers/company/CompanyController');

const validateFormCompany = require('../../app/middleware/validateCompany/validateFormCompany');
const validateDataCompanyService = require('../../app/middleware/service/validate/validateDataCompany.service');

Router.get('/:id/detail', CompanyController.showDetail);

Router.put(
  '/:id/update',
  validateFormCompany,
  validateDataCompanyService,
  CompanyController.update,
);

Router.get('/:id/edit', CompanyController.edit);

module.exports = Router;
