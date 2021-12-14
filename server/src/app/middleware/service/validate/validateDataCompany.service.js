const Company = require('../../../models/Company');
const ERROR = require('../../../../config/errors');
module.exports = async (req, res, next) => {
  try {
    let company = await Company.findOne({
      name: req.body.name,
      _id: { $ne: req.params.id },
    });
    if (company) {
      return res.json({ error: ERROR.COMPANY_EXISTS });
    }
    return next();
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
