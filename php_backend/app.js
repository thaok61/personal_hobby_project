require("dotenv").config();
require("./api/data/db.connection");

// const cors = require('cors')

const express = require("express");
const albumRouter = require("./api/route/album.route");
const userRouter = require("./api/route/user.route");

const headerMiddleware = require("./api/middleware/add_header.middleware");

const app = express();
// app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("",headerMiddleware.addHeader);

app.use(process.env.API_ALBUMS_URL, albumRouter);
app.use(process.env.API_USERS_URL, userRouter);

const server = app.listen(process.env.PORT, () => {
    console.log(process.env.MSG_LISTEN_PORT, server.address().port);
})