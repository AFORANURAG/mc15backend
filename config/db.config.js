require("dotenv").config()
console.log(process.env.MONGO_URL)
const mongoose = require("mongoose")
const connection = mongoose.connect(process.env.MONGO_URL)
module.exports = {connection}