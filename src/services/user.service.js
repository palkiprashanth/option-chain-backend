const { User } = require("../models");
const { HttpBadRequest } = require("../../express/custom_exceptions/http.error");
const sgMail = require("@sendgrid/mail");
const { signTokenWith, decodeToken } = require("../../express/utils/authentication");

const Axios = require("axios")
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class UserService {

    // USER REGISTRATION
    async register(registerParams){
        await User.insertOne(registerParams);
        return { message : "Woah! User Registration Successful."}
    }

    // USER LOGIN 
    async signInUser(loginParams) {
        const user = await User.findOne({ email: loginParams["email"], password: loginParams["password"] });
        if (!user) throw new HttpBadRequest("Invalid username or password");

        const token = signTokenWith({ userId: user.id });
        const decodedToken = decodeToken(token);
        return { token, userId: user.id };
    };

    // GET NIFTY OPTIONS DATA
    async getOptionsNifty() {
        try {
            const nifty_data = await Axios.get(`${process.env.NIFTY_API}`);
            return nifty_data.data;
        } catch (error) {
            console.log("Oops.. Something went wrong");
        }
    };

    // GET BANK NIFTY OPTIONS DATA
    async getOptionsBankNifty() {
        try {
            const banknifty_data = await Axios.get(`${process.env.BANKNIFTY_API}`);
            return banknifty_data.data;
        } catch (error) {
            console.log("Oops.. Something went wrong");
        }
    };
};

module.exports = UserService;