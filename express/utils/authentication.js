const jwt = require("jsonwebtoken");
const { HttpUnauthorized, HttpUnprocessableEntity, HttpInternalServerError } = require("../custom_exceptions/http.error");
const asyncHandler = require("./async_handler");
const { AuthToken } = require("../../src/models");

/**
 * @typeof {jsonwebtoken.SignOptions} SignOptions
 */
const DEFAULT_JWT_SIGN_IN_OPTIONS = {
    expiresIn: '1h'
};

/**
 * Sign JWT Toke
 * @param {string|Object|Buffer} payload 
 * @param {SignOptions} options
 * @returns token json
 */
const signTokenWith = (payload, options = DEFAULT_JWT_SIGN_IN_OPTIONS) => {
    const secretKey = process.env.APP_SECRET;
    if (!secretKey) throw new HttpInternalServerError("Unable to login, please contact admin");
    
    const token = jwt.sign(payload, secretKey, options);
    return token;
};

/**
 * Decode Token
 * @param {String} token
 * @returns decoded token json
 */
const decodeToken = (token) => {
    const decodedToken = jwt.decode(token, { json: true });
    return decodedToken;
};

/**
 * Verify Token
 * @param {String} token 
 * @returns payload
 */
const verifyToken = async (token) => {
    if (!token) throw new HttpUnauthorized("Please login to continue");
    // const authToken = await AuthToken.findOne({ auth_token: token }).exec();
    // if (!authToken || authToken.blacklisted) throw new HttpUnauthorized("Please login again to continue. if this problem persists, please contact admin");

    const secretKey = process.env.APP_SECRET;
    if (!secretKey) throw new HttpInternalServerError("Something went wrong, please contact admin");

    try {
        const tokenPayload = jwt.verify(token, secretKey)
        return tokenPayload;
    } catch(e) {
        throw new HttpUnauthorized(e);
    };
};

/**
 * Authenticate User
 * @param {express.Request} request
 * @param {express.Response} _
 * @param {express.NextFunction} next
 */
const authenticationMiddleware = asyncHandler(async (request, _, next) => {
    const bearerToken = request.headers.authorization;
    const tokenPayload = await verifyToken(bearerToken);
    request.tokenPayload = tokenPayload;
    const { userId } = tokenPayload || {};
    if (!userId) throw new HttpUnprocessableEntity("Please login again to continue. if this problem persists, please contact admin");
    next();
});

module.exports = { decodeToken, signTokenWith, verifyToken, authenticationMiddleware };