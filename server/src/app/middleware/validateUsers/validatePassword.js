const passwordValidator = require('password-validator');
const ERROR = require('../../../config/errors');
const schema = new passwordValidator();
schema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(['Passw0rd', 'Password123']); // Blacklist these values

module.exports = async (req, res, next) => {
  try {
    const password = req.body.password;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;
    if (password == newPassword) {
      return res.json({ error: ERROR.PASSWORD_EQUAL });
    }
    if (schema.validate(newPassword) && schema.validate(confirmPassword)) {
      return next();
    }
    return res.json({ error: ERROR.VALIDATE_PASSWORD });
  } catch (error) {
    return res.json({ error: error.message });
  }
};
