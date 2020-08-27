const mongoose = require('mongoose')
const uri = process.env.NODE_ENV === 'production'
            ? 'mongodb+srv://heinz:89232478866Aa@cluster0.biyrc.mongodb.net/wiseness?retryWrites=true&w=majority'
            : 'mongodb://127.0.0.1:27017/sources'

mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db