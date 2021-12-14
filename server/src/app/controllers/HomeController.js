const Company = require('../models/Company');
// const UserCompany = require('../models/UserCompany');
const User = require('../models/User');

class HomeController {
  async index(req, res, next) {
    try {
      const companies = await Company.find({});
      // const userAdmin = await User.findOne({admin: true});
      return res.status(200).json(companies);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}
module.exports = new HomeController();
