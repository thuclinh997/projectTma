const express = require('express');
const Router = express.Router();

const HomeController = require('../../app/controllers/HomeController');

Router.get('/', HomeController.index);

module.exports = Router;
