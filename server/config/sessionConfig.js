
const sessionConfig = {secret: process.env.SESSIONSECRET,
                    //    name: "sessionId", // name of session cookie
                       resave: false,
                       saveUninitialized: false,
                      }

module.exports = sessionConfig