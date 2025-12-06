const Joi = require('joi');

const schemas = {
  signup: Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(255).required()
  }),
  
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),
  
  developer: Joi.object({
    name: Joi.string().min(2).max(255).required(),
    role: Joi.string().valid('Frontend', 'Backend', 'Full-Stack').required(),
    techStack: Joi.array().items(Joi.string()).min(1).required(),
    experience: Joi.number().integer().min(0).max(50).required(),
    description: Joi.string().max(1000).optional(),
    photoUrl: Joi.string().uri().optional()
  })
};

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });
  
  if (error) {
    const messages = error.details.map(d => d.message);
    return res.status(400).json({ success: false, message: 'Validation error', errors: messages });
  }
  
  req.validatedData = value;
  next();
};

module.exports = { validate, schemas };
