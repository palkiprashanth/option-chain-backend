const errorStatusCodes = require("./error_status_codes");

class HttpError extends Error {
    constructor({ name, statusCode, message }) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
        this.message = message;
        Error.captureStackTrace(this, HttpError);
    };
};

class HttpBadRequest extends HttpError {
    constructor(message = "Bad request") {
        super({
            name: "HTTP_BAD_REQUEST",
            statusCode: errorStatusCodes.BAD_REQUEST,
            message
        });
    };
};

class HttpUnauthorized extends HttpError {
    constructor(message = "Unauthorized") {
        super({
            name: "HTTP_UNAUTHORIZED",
            statusCode: errorStatusCodes.UNAUTHORIZED,
            message
        });
    };
};

class HttpForbidden extends HttpError {
    constructor(message = "Request forbidden") {
        super({
            name: "HTTP_REQUEST_FORBIDDEN",
            statusCode: errorStatusCodes.FORBIDDEN,
            message
        });
    };
};

class HttpNotFound extends HttpError {
    constructor(message = "Not found") {
        super({
            name: "HTTP_NOT_FOUND",
            statusCode: errorStatusCodes.NOT_FOUND,
            message
        });
    };
};

class HttpUnprocessableEntity extends HttpError {
    constructor(message = "Unprocessable entity") {
        super({
            name: "HTTP_UNPROCESSABLE_ENTITY",
            statusCode: errorStatusCodes.UNPROCESSABLE_ENTITY,
            message
        });
    };
};

class HttpInternalServerError extends HttpError {
    constructor(message="Internal server error") {
        super({
            name: "HTTP_INTERNAL_SERVER_ERROR",
            statusCode: errorStatusCodes.INTERNAL_SERVER_ERROR,
            message
        });
    };
};

module.exports = {
    HttpError,
    HttpBadRequest,
    HttpUnauthorized,
    HttpForbidden,
    HttpNotFound,
    HttpUnprocessableEntity,
    HttpInternalServerError
};