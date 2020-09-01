const mongoose = require('mongoose')
const config = require('../config.json')

const uri = process.env.NODE_ENV === 'production'
            ? process.env.MONGO_URI || config.connectionString
            : 'mongodb://127.0.0.1:27017/sources'

mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db