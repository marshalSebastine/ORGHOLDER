let appConfig = Object.freeze({
    port: process.env.PORT,
    env: process.env.NODE_ENV,
})

module.exports = appConfig;