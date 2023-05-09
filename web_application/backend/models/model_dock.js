const mongoose = require('mongoose')

const Schema = mongoose.Schema

const dockSchema = new Schema({
  name: { type: String, required: true, unique: true },
  address: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
  The_minimum_draft_of_the_ship:{ type: Number, required: true }
})

module.exports = mongoose.model('Dock', dockSchema, 'dock')
