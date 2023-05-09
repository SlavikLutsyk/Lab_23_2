const mongoose = require('mongoose')

const Schema = mongoose.Schema

const portSchema = new Schema({
   name: { type: String, required: true, },
   country: { type: String, required: true },
   number: { type: Number, required: true },
   address: { type: String, required: true }
})

module.exports = mongoose.model('Port', portSchema, 'port')
