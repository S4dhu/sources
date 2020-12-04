const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Source = new Schema(
    {
        name: { type: String, required: true },
        link: { type: String, required: true },
        user: { type: String, required: true },
        category: { type: String, required: false }
    },
    { timestamps: true },
)

module.exports = mongoose.model('sources', Source)