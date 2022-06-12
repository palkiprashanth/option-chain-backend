const mongoose = require("mongoose");
 
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        password: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true 
        }
    }
);
 
const User = mongoose.model("users", userSchema);
 
module.exports = User;