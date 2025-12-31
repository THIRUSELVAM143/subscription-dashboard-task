const Joi = require("joi");

exports.createPlanSchema = Joi.object({
  name: Joi.string().min(2).max(100).trim().required(),
  price: Joi.number().positive().required(),
  duration: Joi.number().integer().positive().required(),
  features: Joi.array().items(Joi.string().trim().allow("")).default([]).optional()
});

exports.updatePlanSchema = Joi.object({
  name: Joi.string().min(2).max(100).trim().optional(),
  price: Joi.number().positive().optional(),
  duration: Joi.number().integer().positive().optional(),
  features: Joi.array().items(Joi.string().trim().allow("")).optional()
});

