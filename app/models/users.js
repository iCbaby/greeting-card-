/**
 * @description user schema
 * @author iC
 */

const mongoose = require('mongoose')
const { Schema, model } = mongoose
require('mongoose-type-email')

const userSchema = new Schema(
  {
    __v: {
      type: Number,
      select: false
    },
    dingdingNumber: {
      type: String,
      required: true,
      unique: true
    },
    cardLimit_11: {
      type: Number,
      min: 0,
      max: 2,
      require: true
    },
    cardLimit_66: {
      type: Number,
      min: 0,
      max: 2,
      require: true
    },
    cardLimit_88: {
      type: Number,
      min: 0,
      max: 2,
      require: true
    }
  },
  { timestamps: true }
)

module.exports = model('User', userSchema)
