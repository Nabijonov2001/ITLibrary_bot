const config = require('dotenv')
config.config()

module.exports = {
    token:process.env.token,
    mongo_url: process.env.mongo_url,
    adminId: process.env.admin
}