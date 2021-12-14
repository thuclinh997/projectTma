const Joi = require('joi');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      password: Joi.string()
        .min(8)
        .max(50)
        .required()
        .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')),
      newPassword: Joi.string()
        .min(8)
        .max(50)
        .required()
        .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')),
      confirmPassword: Joi.string()
        .required()
        .valid(Joi.ref('newPassword'))
        .required(),
      image: Joi.string().allow(null).allow(''),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.json({ error: error.message });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
  next();
};
