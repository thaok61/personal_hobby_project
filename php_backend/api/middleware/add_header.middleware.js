const ENV = process.env;
const addHeader =  (req, res, next) => {
    res.header(ENV.ALLOW_ORIGIN, ENV.ALLOW_ORIGIN_VALUE);
    res.header(ENV.ALLOW_HEADERS, ENV.ALLOW_HEADERS_VALUE);
    res.header(ENV.ALLOW_METHODS, ENV.ALLOW_METHODS_VALUE);
    next();
}

module.exports = {
    addHeader
}