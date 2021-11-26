const Joi = require("joi");
const createPassword = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  retPassword: Joi.ref("password"),
});

module.exports = createPassword;
