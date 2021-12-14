const Joi = require('joi');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      _id: Joi.string(),
      email: Joi.string()
        .min(5)
        .max(50)
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string()
        .min(8)
        .max(50)
        .required()
        .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(401).json({ error: error.message });
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
