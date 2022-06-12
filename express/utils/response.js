const { HttpInternalServerError } = require("../custom_exceptions/http.error");

class AppResponse {
    /**
     * Success Response Format
     * @param {Object} options
      * @param {Number} options.statusCode
      * @param {Object} options.data
     * @returns success json
     */
    static success = ({ statusCode = 200, data = {} } = {}) => ({
        statusCode,
        data,
        timestamp: new Date()
    });

    /**
     * Error Response Format
     * @param {Object} error
     * @returns error json
     */
    static error = (error = new HttpInternalServerError("Something went wrong!")) => ({
        statusCode: error.statusCode || 500,
        error: error.message,
        stack: error.stack,
        timestamp: new Date()
    });
};

/**
 * Output Response Format
 * @param {Object} appResponse
 * @returns output json
 */
const outputResponse = (appResponse) => {
    const response = {
        success: appResponse.statusCode >= 200 && appResponse.statusCode < 400,
        timestamp: appResponse.timestamp,
        data: appResponse.data,
        error: appResponse.error,
        stack: appResponse.stack
    };

    return response;
};

module.exports = { AppResponse, outputResponse };