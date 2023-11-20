const Mongoose = require("mongoose");

const userSchema = Mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    gender: String,
    name: String
});



Mongoose.model(process.env.USER_MODEL, userSchema, process.env.USER_DOCUMENT);