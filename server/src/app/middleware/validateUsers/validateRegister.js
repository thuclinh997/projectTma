const Joi = require('joi');
module.exports = async (req, res, next) => {
  //ajv | joi validate
  try {
    const schema = Joi.object({
      invited: Joi.string()
        .required()
        .lowercase()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net', 'uk', 'vn'] },
        }),
      accountInvited: Joi.string()
        .required()
        .lowercase()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net', 'uk', 'vn'] },
        }),
      confirmAccount: Joi.string()
        .required()
        .valid(Joi.ref('accountInvited'))
        .required(),
      inviter: Joi.string()
        .required()
        .lowercase()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net', 'uk', 'vn'] },
        }),
      persona: Joi.string(),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      console.log('hello error');
      return res.status(400).json({
        error: error.message,
      });
    }
    return next();
  } catch (error) {
    return;
  }
};
