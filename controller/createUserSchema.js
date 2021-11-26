const Joi = require("joi");
const creatUserSchema = Joi.object({
  first_name: Joi.string().alphanum().min(2).max(25).required(),
  last_name: Joi.string().alphanum().min(2).max(25).required(),
  email: Joi.string().email().lowercase().required(),
  work_email: Joi.string().email().lowercase().required(),
  date_of_birth: Joi.date(),
  position: Joi.string().min(4).max(40).required(),
  phone: Joi.string().pattern(/^[0-9]+$/),
  social_card_no: Joi.string().pattern(/[0-9]/).length(16),
  hashVarify: Joi.string(),
});

module.exports = creatUserSchema;
