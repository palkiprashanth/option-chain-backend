const express = require("express");
const endpoints = require("./endpoints");
const { authenticationMiddleware, asyncHandler, AppResponse } = require("../../../express/utils");
const { registerValidation, userValidation } = require("./middlewares/validation");
const UserService = require("../../services/user.service");
const router = express.Router({});
const userService = new UserService();

// REGISTER A NEW USER
// router.post(endpoints.register, registerValidation, authenticationMiddleware, asyncHandler(async (request, _, next) => {
//     const response = await userService.register(request.body);
//     next(AppResponse.success({ data: response }));
// }));

// SIGN IN USER 
router.post(endpoints.signInUser, userValidation, asyncHandler(async (request, _, next) => {
    const response = await userService.signInUser(request.body);
    next(AppResponse.success({ data: response }));
}));

// GET NIFTY OPTIONS DATA
router.get(endpoints.getOptionsNifty, authenticationMiddleware, asyncHandler(async (request, _, next) => {
    const response = await userService.getOptionsNifty();
    next(AppResponse.success({ data: response }));
}));

// GET BANK NIFTY OPTIONS DATA
router.get(endpoints.getOptionsBankNifty, authenticationMiddleware, asyncHandler(async (request, _, next) => {
    const response = await userService.getOptionsBankNifty();
    next(AppResponse.success({ data: response }));
}));

module.exports = router;