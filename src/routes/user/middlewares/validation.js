const Joi = require("joi");
const { asyncHandler, genericValidator } = require("../../../../express/utils");

const registerSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    organization: Joi.string().required(),
    email: Joi.string().required(),
});

const userSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});

const registerValidation = asyncHandler(async (request, _, next) => {
    request = genericValidator(registerSchema, request);
    next();
});

const userValidation = asyncHandler(async (request, _, next) => {
    request = genericValidator(userSchema, request);
    next();
});


module.exports = { registerValidation , userValidation};