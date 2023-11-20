const jwt = require('jsonwebtoken');

const Message = require("../../constant/message");
const CODE = require("../../constant/status.code");

const verifyToken = (req, res, next) => {
    const authorizationHeader = req.header(process.env.AUTHORIZATION);

    const token = authorizationHeader.split(" ")[1];

    if (!token) return res.status(CODE.STATUS_UNAUTHORIZED).json({ message: Message.MSG_UNAUTHORIZED });

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log(err);
            res.status(CODE.STATUS_BAD_REQUEST).json({ message: Message.MSG_INVALID_TOKEN });
            return;
        }
        next();
    });
}

module.exports = {
    verifyToken
}