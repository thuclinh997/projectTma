// const joiDataUri = require('joi-dataURI')
const Joi = require('joi')
module.exports = async (req, res, next) => {
  //ajv | joi validate
  const schema = Joi.object({
    _id: Joi.string(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    business: Joi.string().required(),
    image: Joi.string().allow(null).allow('').dataUri(),
    'contact.street': Joi.string().required(),
    'contact.city': Joi.string().required(),
    'contact.country': Joi.string().required(),
    'contact.phone_number': Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    console.log(error);
    return res.json({ error: error.message });
  }
  next();
};
