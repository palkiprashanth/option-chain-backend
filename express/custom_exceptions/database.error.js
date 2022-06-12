const errorStatusCodes = require("./error_status_codes");
const { HttpError } = require("./http.error");

class DatabaseError extends HttpError {
	constructor(message = "Database error") {
		super({
			name: "DATABASE_ERROR",
			statusCode: errorStatusCodes.BAD_REQUEST,
			message
		});
	};
};

module.exports = {
	DatabaseError
};