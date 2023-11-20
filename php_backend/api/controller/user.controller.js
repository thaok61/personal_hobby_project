const Mongoose = require("mongoose");
const User = Mongoose.model(process.env.USER_MODEL);
const CODE = require("../../constant/status.code");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Message = require("../../constant/message");

const register = (req, res) => {
    const user = req.body;
    if (!user.username) {
        return res.status(CODE.STATUS_BAD_REQUEST).json({ message: Message.MSG_INVALID_USERNAME });
    }
    if (!user.password) {
        return res.status(CODE.STATUS_BAD_REQUEST).json({ message: Message.MSG_INVALID_PASSWORD });
    }

    bcrypt.genSalt()
        .then((salt) => bcrypt.hash(user.password, salt))
        .then((hashPassword) => {
            user.password = hashPassword;
            return User.create(user);
        })
        .then((data) => res.status(CODE.STATUS_OK).json({ message: Message.MSG_REGISTER_SUCCESS }))
        .catch((err) => res.status(CODE.STATUS_SERVER_ERROR).json({ message: CODE.STATUS_SERVER_ERROR }));
}

const login = (req, res) => {
    const userRequest = req.body;
    if (!userRequest.username) {
        return res.status(400).json({ message: Message.MSG_INVALID_USERNAME });
    }
    if (!userRequest.password) {
        return res.status(400).json({ message: Message.MSG_INVALID_PASSWORD });
    }

    User.findOne(
        {
            username: userRequest.username
        },
    )
        .then((userDb) => checkPassword(userRequest, userDb))
        .then((user) => createJwtToken({username: user.username, gender: user.gender, name: user.name}))
        .then((token) => {
            res.status(CODE.STATUS_OK).json({token: token})
        })
        .catch((err) => res.status(CODE.STATUS_NOT_FOUND).json({ message: Message.MSG_NOT_FOUND_USERNAME}));
}

const checkPassword = async (userRequest, userDb) => {
    let result = await bcrypt.compare(userRequest.password, userDb.password);
    if (result) {
        return userDb;
    } else {
        return null;
    }
}

function createJwtToken(payload) {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, process.env.SECRET_KEY, (error, token) => {
        if (error) {
            console.log(error);
          reject(error);
        } else {
          resolve(token);
        }
      });
    });
  }

module.exports = {
    register,
    login
}

