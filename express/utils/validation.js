const Joi = require("joi");
const { HttpBadRequest } = require("../custom_exceptions/http.error");

const DEFAULT_VALIDATION_OPTION = {
    stripUnknown: true
};
const DEFAULT_GENERIC_VALIDATOR_OPTION = {
    bodyKey: "body"
};

/**
 * Validate Request Query Params
 * @param {joi.ValidationOptions} schema
 * @param {express.Request} request
 * @returns sanitizeRequest
 */
const genericQueryValidator = (schema, request) => {
    const { value, error } = schemaValidate(schema, request.query);
    if (error) {
        throw new HttpBadRequest(errorFormatting(error));
    };
    return request;
};

/**
 * Validate Request Body Params
 * @param {joi.ValidationOptions} schema
 * @param {express.Request} request
 * @param {Object} options
  * @param {String} options.bodyKey default="body"
 * @returns sanitizeRequest
 */
const genericValidator = (schema, request, options = DEFAULT_GENERIC_VALIDATOR_OPTION) =>
{
    const { bodyKey } = options;
    const { value, error } = schemaValidate(schema, request[bodyKey]);
    if (error) {
        throw new HttpBadRequest(errorFormatting(error));
    };
    return sanitizeRequest(request, value);
};

/**
 * Joi Validate
 * @param {joi.ValidationOptions} schema
 * @param {express.Request} request
 * @param {Object} options
  * @param {Boolean} options.stripUnknown default=true
 * @returns validation output
 */
const schemaValidate = (schema, request, options = DEFAULT_VALIDATION_OPTION) => {
    const validationResult = schema.validate(request, options);
    return validationResult;
};

/**
 * Format Validation Error
 * @param {Object} error 
 * @returns formatted error
 */
const errorFormatting = (error) => {
    const message = error.details.map(i => i.message.replace(/\"/g, "")).join(", ");
    return message;
};

/**
 * SanitizeRequest
 * @param {express.Request} request
 * @param {Object} permittedValues
 * @param {String} permitKey default="permitted"
 * @returns request with permitted key
 */
const sanitizeRequest = (request, permittedValues, permitKey = "permitted") => {
    request[permitKey] = Object.assign(request[permitKey] || {}, permittedValues);
    return request;
};

module.exports = { genericQueryValidator, genericValidator };