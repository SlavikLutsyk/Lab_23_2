const mongoose = require('mongoose')

const Schema = mongoose.Schema

const shipSchema = new Schema({
  name: { type: String, required: true },
  contry: { type: String, required: true },
  number: { type: String, required: true },
  tonnage: { type: Number , required: true },
  sediment:{ type: Number , required: true }
})

module.exports = mongoose.model('Ship', shipSchema, 'ship')
