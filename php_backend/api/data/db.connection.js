const Mongoose = require("mongoose");
require("./album.model");
require("./user.model");

const ENV = process.env;
Mongoose.connect(ENV.MONGODB_URL);

Mongoose.connection.on(ENV.TAG_CONNECTED_DB, () => {
    console.log(ENV.MSG_CONNECTED_DB);
});

Mongoose.connection.on(ENV.TAG_ERROR_DB, (err) => {
    console.log(ENV.TAG_ERROR_DB, err);
});

Mongoose.connection.on(ENV.TAG_DISCONNECTED_DB, () => {
    console.log(ENV.MSG_DISCONNECTED_DB);
})