const { AppResponse } = require("./response");

/**
 * AsyncHandler
 * @param {Function} fn
 */
const asyncHandler = (fn) => 
    /**
     * @param {express.NextFunction} next
     */
    function asyncHandlerWrap(...args) {
        const fnReturn = fn(...args);
        const next = args[args.length - 1];

        return Promise.resolve(fnReturn).catch((e) => {
            next(AppResponse.error(e));
        });
    };

module.exports = asyncHandler;