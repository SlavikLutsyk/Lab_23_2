const mongoose = require('mongoose')

const Schema = mongoose.Schema

const shipOndockSchema = new Schema({
  ship: { type: String, required: true },
  dock: { type: String, required: true },
})

module.exports = mongoose.model('ShipOndock', shipOndockSchema, 'shipOndock')
