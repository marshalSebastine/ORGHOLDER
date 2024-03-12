
console.log(process.env.SESSIONSECRET)
const sessionConfig = {secret: process.env.SESSIONSECRET,
                       name: "sessionId" // name of session cookie
                      }

module.exports = sessionConfig