const User = require('../../../models/User');
const ERROR = require('../../../../config/errors');

module.exports = async (req, res, next) => {
  try {
    const checkEmail = await User.findOne({ email: req.body.accountInvited });
    if (checkEmail) {
      return res.status(400).json({
        error: ERROR.EMAIL_EXISTS,
      });
    }
    return next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
